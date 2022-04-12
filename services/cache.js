const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");
const keys = require("../config/keys")

const client = redis.createClient(keys.redisURL);
client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");
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
  const cacheValue = await client.hget(this.hashKey, key);
  // If YES, return that
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);

    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }

  // If NO, issue the query and store the value in redis
  const result = await exec.apply(this, arguments);

  client.hset(this.hashKey, key, JSON.stringify(result), "EX", 10);
  return result;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};
