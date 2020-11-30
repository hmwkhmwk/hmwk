const express = require("express");
const router = express.Router();

const transformationRoutes = require("./transformation");
const reseedRoutes = require("./reseed")();
const trackerRoutes = require("./tracker");
const oauthRoutes = require("./oauth");
const hashRoutes = require("./hash");
const submitRoutes = require("./submit");

router.use(transformationRoutes);
router.use(reseedRoutes);
router.use(trackerRoutes);
router.use(oauthRoutes);
router.use(hashRoutes);
router.use(submitRoutes);

module.exports = router;
