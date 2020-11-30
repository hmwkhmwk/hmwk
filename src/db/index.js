const { promisify } = require("util");

const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");
const redis = require("redis");
const JSONCache = require("redis-json");
const { exit } = require("process");
require("dotenv").config();

const RESEED_PATH_PREFIX = "/reseed";
const TRACKER_PATH_PREFIX = "/tracker";
const SUBMIT_PATH_PREFIX = "/submit";
const OAUTH_PATH_PREFIX = "/oauth";

// Decide between Redis or JsonDB.
const USE_REDIS = process.env.USE_REDIS === "true";

/* Redis-related config. */
// Won't be used if REDISTOGO_URL is present.
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_OPTIONS = {};
const JC_PREFIX = "jc";

// Default hmwk-db.json filename.
const JSON_DB_FILENAME = process.env.JSON_DB_FILENAME || "hmwk-db";

// RedisDBAdaptor adapts a Redis JSONCache to an "interface"
// consistent with our legacy JsonDB.
class RedisDBAdaptor {
  constructor(client) {
    this._client = client;
    this._jsonCache = new JSONCache(client);

    // Promisified-methods.
    this._asyncKeys = promisify(this._client.keys).bind(this._client);
    this._asyncGet = promisify(this._client.get).bind(this._client);
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
    // Hack for paths like "a/b/c".
    if ((dataPath.match(/\//g) || []).length === 1) {
      let ret = {};
      const keys = await this._asyncKeys(`${JC_PREFIX}:${dataPath}*`);
      for (let key of keys) {
        if (key.match(/^jc:.+_t$/g)) {
          continue;
        }
        // Strip JC_PREFIX.
        key = key.substring(JC_PREFIX.length + 1);
        const keySuffix = key.substring(key.lastIndexOf("/") + 1);
        const value = await this._jsonCache.get(key);
        ret[keySuffix] = value;
      }
      return ret;
    }

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

let redisDBSingleton, jsonDBSingleton;

/**
 * Create a new hmwk JsonDB or RedisDBAdaptor, depending on USE_REDIS.
 * @param {string} fileName database filename. Defaults to DB_FILENAME.
 * @param {boolean} saveOnPush save to the database after every operation.
 * @returns {JsonDBAdaptor|RedisDBAdaptor}
 */
function newDB() {
  // Redis.
  if (USE_REDIS) {
    if (redisDBSingleton === undefined) {
      let client;
      // Use Redis to Go if REDISTOGO_URL is present.
      // https://devcenter.heroku.com/articles/redistogo#using-with-node-js
      if (process.env.REDISTOGO_URL) {
        const rtg = require("url").parse(process.env.REDISTOGO_URL);
        client = redis.createClient(rtg.port, rtg.hostname, REDIS_OPTIONS);
        client.auth(rtg.auth.split(":")[1]);
      } else {
        client = redis.createClient(REDIS_PORT, REDIS_HOST, REDIS_OPTIONS);
      }
      redisDBSingleton = new RedisDBAdaptor(client);
    }
    return redisDBSingleton;
  }

  // JsonDB.
  if (jsonDBSingleton === undefined) {
    const jsonDB = new JsonDB(
      new Config(
        JSON_DB_FILENAME,
        true /* humanReadable */,
        true /* saveOnPush */,
        "/" /* separator */
      )
    );
    jsonDBSingleton = new JsonDBAdaptor(jsonDB);
  }
  return jsonDBSingleton;
}

module.exports = {
  newDB,
  TRACKER_PATH_PREFIX,
  SUBMIT_PATH_PREFIX,
  RESEED_PATH_PREFIX,
  OAUTH_PATH_PREFIX,
};
