const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");
const AsyncLock = require("async-lock");

// Default hmwk-db.json filename.
const DB_FILENAME = "hmwk-db";

const RESEED_PATH_PREFIX = "/reseed";
const TRACKER_PATH_PREFIX = "/tracker";
const SUBMIT_PATH_PREFIX = "/submit";

// Implements concurrent DB supporting thread-safe read/write/delete operations
class ConcurrentDB {
  constructor(jsonDB) {
    this._jsonDB = jsonDB;

    // for synchronization
    this._lock = new AsyncLock();
    this.LOCK_KEY = "LOCK_KEY";
  }

  // Methods
  push(dataPath, value) {
    this._lock.acquire(this.LOCK_KEY, () => {
      console.log(
        `Acquired lockfor push where dataPath=${dataPath}, value=${JSON.stringify(
          value
        )}`
      );
      this._jsonDB.push(dataPath, value);
    });
  }

  delete(dataPath) {
    this._lock.acquire(this.LOCK_KEY, () => {
      console.log(
        `Acquired lock=${this.LOCK_KEY} for delete where dataPath=${dataPath}`
      );
      this._jsonDB.delete(dataPath);
    });
  }

  exists(dataPath) {
    let ret = false;
    this._lock.acquire(this.LOCK_KEY, () => {
      console.log(`Acquired lockfor exists where dataPath=${dataPath}`);
      ret = this._jsonDB.exists(dataPath);
    });
    return ret;
  }

  getData(dataPath) {
    let ret;
    this._lock.acquire(this.LOCK_KEY, () => {
      console.log(`Acquired lockfor getData where dataPath=${dataPath}`);
      ret = this._jsonDB.getData(dataPath);
    });
    return ret;
  }
}

/**
 * Create a new hmwk JsonDB.
 * @param {string} fileName database filename. Defaults to DB_FILENAME.
 * @param {boolean} saveOnPush save to the database after every operation.
 * @returns {JsonDB}
 */
function newDB(filename = DB_FILENAME, saveOnPush = true) {
  const jsonDB = new JsonDB(
    new Config(
      filename,
      true /* humanReadable */,
      saveOnPush,
      "/" /* separator */
    )
  );
  return new ConcurrentDB(jsonDB);
}

module.exports = {
  newDB,
  RESEED_PATH_PREFIX,
};
