const express = require("express");
const router = express.Router();

const trackerController = require("../controllers/tracker-controller");
const authenticationMiddleware = require("../middlewares/authentication")
  .authenticationMiddleware;

router.post(
  "/tracker/track",
  authenticationMiddleware,
  trackerController.track
);

module.exports = router;
