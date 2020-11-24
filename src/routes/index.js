const express = require("express");
const router = express.Router();

const transformationRoutes = require("./transformation");
const reseedRoutes = require("./reseed")();
const trackerRoutes = require("./tracker");
const hashRoutes = require("./hash");

router.use(transformationRoutes);
router.use(reseedRoutes);
router.use(trackerRoutes);
router.use(hashRoutes);

module.exports = router;
