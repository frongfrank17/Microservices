const redis = require("redis");
const client = redis.createClient();
const { promisify } = require('util')
client.select(1)
exports.asyncGet = promisify(client.get).bind(client)
exports.asyncSet = promisify(client.set).bind(client)

exports.client = client