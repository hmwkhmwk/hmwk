const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");

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

module.exports = {
  newDB,
  TRACKER_PATH_PREFIX,
  SUBMIT_PATH_PREFIX,
  RESEED_PATH_PREFIX,
};
