const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");
const Redis = require("ioredis");
const JSONCache = require("redis-json");
require("dotenv").config();

const RESEED_PATH_PREFIX = "/reseed";
const TRACKER_PATH_PREFIX = "/tracker";
const SUBMIT_PATH_PREFIX = "/submit";

// Decide between Redis or JsonDB.
const USE_REDIS = process.env.USE_REDIS === "true";

// Redis-related config.
const REDIS_PORT = process.env.REDIS_PORT || 0;
const REDIS_HOST = process.env.REDIS_HOST || "";
const REDIS_OPTIONS = {};

// Default hmwk-db.json filename.
const JSON_DB_FILENAME = process.env.JSON_DB_FILENAME || "hmwk-db";

// RedisDBAdaptor adapts a Redis JSONCache to an "interface"
// consistent with our legacy JSONDB.
class RedisDBAdaptor {
  constructor(jsonCache) {
    this._jsonCache = jsonCache;
  }

  async push(dataPath, value) {
    return await this._jsonCache.set(dataPath, value);
  }

  async delete(dataPath) {
    return await this._jsonCache.del(dataPath);
  }

  async exists(dataPath) {
    const got = await this._jsonCache.get(dataPath);
    return got !== undefined;
  }

  async getData(dataPath) {
    return await this._jsonCache.get(dataPath);
  }
}

// JsonDBAdaptor adapts a JsonDB to an "interface"
// consistent with the new Redis DB.
// Unfortunately, this means JsonDBAdaptor needs to be async,
// while the original JsonDB wasn't.
class JsonDBAdaptor {
  constructor(jsonDB) {
    this._jsonDB = jsonDB;
  }

  async push(dataPath, value) {
    return this._jsonDB.push(dataPath, value);
  }

  async delete(dataPath) {
    return this._jsonDB.delete(dataPath);
  }

  async exists(dataPath) {
    return this._jsonDB.exists(dataPath);
  }

  async getData(dataPath) {
    return this._jsonDB.getData(dataPath);
  }
}

/**
 * Create a new hmwk JsonDB or RedisDBAdaptor, depending on USE_REDIS.
 * @param {string} fileName database filename. Defaults to DB_FILENAME.
 * @param {boolean} saveOnPush save to the database after every operation.
 * @returns {JsonDBAdaptor|RedisDBAdaptor}
 */
function newDB() {
  // Redis.
  if (USE_REDIS) {
    const redis = new Redis(REDIS_PORT, REDIS_HOST, REDIS_OPTIONS);
    const jsonCache = new JSONCache(redis);
    return new RedisDBAdaptor(jsonCache);
  }

  // JsonDB.
  const jsonDB = new JsonDB(
    new Config(
      JSON_DB_FILENAME,
      true /* humanReadable */,
      true /* saveOnPush */,
      "/" /* separator */
    )
  );
  return new JsonDBAdaptor(jsonDB);
}

module.exports = {
  newDB,
  TRACKER_PATH_PREFIX,
  SUBMIT_PATH_PREFIX,
  RESEED_PATH_PREFIX,
};
