const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");
const AsyncLock = require("async-lock");

// Default hmwk-db.json filename.
const DB_FILENAME = "hmwk-db";

const RESEED_PATH_PREFIX = "/reseed";
const TRACKER_PATH_PREFIX = "/tracker";
const SUBMIT_PATH_PREFIX = "/submit";

/**
 * Create a new hmwk JsonDB.
 * @param {string} fileName database filename. Defaults to DB_FILENAME.
 * @param {boolean} saveOnPush save to the database after every operation.
 * @returns {JsonDB}
 */
function newDB(filename = DB_FILENAME, saveOnPush = true) {
  return new JsonDB(
    new Config(
      filename,
      true /* humanReadable */,
      saveOnPush,
      "/" /* separator */
    )
  );
}

// Implements synchronous read/write/delete operations
class hmwkDB {
  constructor(filename = DB_FILENAME, saveOnPush = true) {
    this._jsonDB = new JsonDB(
      new Config(
        filename,
        true /* humanReadable */,
        saveOnPush,
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
      this._jsonDB.push(dataPath, value);
    });
  }

  delete(dataPath) {
    this._lock.acquire(this.LOCK_KEY, () => {
      this._jsonDB.delete(dataPath);
    });
  }
}

module.exports = {
  hmwkDB,
  newDB,
  RESEED_PATH_PREFIX,
};
