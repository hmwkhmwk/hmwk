const nodeJsonDb = require("node-json-db");
const nodeJsonDbConfig = require("node-json-db/dist/lib/JsonDBConfig");

/**
 * Create a new JsonDB.
 * @param {string} fileName database filename.
 * @param {boolean} humanReadable save the database in a human readable format.
 * @param {string} separator separator. By default it's forward-slash.
 * @returns {JsonDB}
 */
function newDB(fileName, humanReadable) {
  return new nodeJsonDb.JsonDB(
    new nodeJsonDbConfig.Config(
      fileName,
      true /* saveOnPush */,
      humanReadable,
      "/"
    )
  );
}

module.exports = {
  newDB,
};
