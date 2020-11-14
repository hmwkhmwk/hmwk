const express = require("express");

const dbmodule = require("../db");
const ReseedController = require("../controllers/reseed-controller");
const authenticationMiddleware = require("../middlewares/authentication")
  .authenticationMiddleware;

function routes(dbFileName, humanReadable = true) {
  const db = dbmodule.newDB(dbFileName, humanReadable);
  const ctrl = new ReseedController(db);

  const router = express.Router();
  router.post("/reseed/subscribe", authenticationMiddleware, ctrl.subscribe);
  router.post(
    "/reseed/unsubscribe",
    authenticationMiddleware,
    ctrl.unsubscribe
  );
  return router;
}

module.exports = routes;
