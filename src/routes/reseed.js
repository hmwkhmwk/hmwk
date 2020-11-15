const express = require("express");

const ReseedController = require("../controllers/reseed-controller");
const authenticationMiddleware = require("../middlewares/authentication")
  .authenticationMiddleware;

function routes() {
  const ctrl = new ReseedController();

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
