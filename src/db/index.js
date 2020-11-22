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
  constructor() {
    this._jsonDB = new JsonDB(
      new Config(
        DB_FILENAME,
        true /* humanReadable */,
        true /* saveOnPush */,
        "/" /* separator */
      )
    );

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
}

/**
 * Create a new hmwk JsonDB that supports thread-safe
 * "read"/"write"/"delete" operations
 */
function newDB() {
  return new ConcurrentDB();
}

module.exports = {
  newDB,
  RESEED_PATH_PREFIX,
};
