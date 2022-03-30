const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");

const redisURL = "redis://127.0.0.1:6379";
const client = redis.createClient(redisURL);
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function () {
  this.useCache = true;
  return this;
};

mongoose.Query.prototype.exec = async function () {
  //   console.log("I'M ABOUT TO RUN A QUERY");
  //   console.log(this.getQuery());
  //   console.log(this.mongooseCollection.name);

  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );
  // See if we have a value for a key in Redis.
  const cacheValue = await client.get(key);
  // If YES, return that
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);

    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }

  // If NO, issue the query and store the value in redis
  const result = await exec.apply(this, arguments);

  client.set(key, JSON.stringify(result));
  return result;
};
