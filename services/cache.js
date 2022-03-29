const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");

const redisURL = "redis://127.0.0.1:6379";
const client = redis.createClient(redisURL);
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = function () {
  console.log("I'M ABOUT TO RUN A QUERY");
  console.log(this.getQuery());
  console.log(this.mongooseCollection.name);

  const key = Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name,
  });
  console.log(key);
  return exec.apply(this, arguments);
};
