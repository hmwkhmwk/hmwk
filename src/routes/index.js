const express = require("express");
const router = express.Router();

const transformationRoutes = require("./transformation");
const reseedRoutes = require("./reseed")("reseed-db");
const trackerRoutes = require("./tracker");

router.use(transformationRoutes);

router.use(reseedRoutes);
router.get("/", function (req, res) {
  res.json(getHealth());
});

router.use(trackerRoutes);

router.get("/health", function (req, res) {
  res.json(getHealth());
  res.end();
});

function getHealth() {
  return {
    ok: true,
    message: "Healthy",
  };
}

module.exports = router;
