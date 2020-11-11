const express = require("express");
const router = express.Router();

const reseedController = require("../controllers/reseed-controller").default;
const authenticationMiddleware = require("../middlewares/authentication")
  .authenticationMiddleware;

router.post(
  "/reseed/subscribe",
  authenticationMiddleware,
  reseedController.subscribe
);
router.post(
  "/reseed/unsubscribe",
  authenticationMiddleware,
  reseedController.unsubscribe
);

module.exports = router;
