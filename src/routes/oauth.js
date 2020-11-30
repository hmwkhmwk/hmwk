const express = require("express");
const router = express.Router();

const oauthController = require("../controllers/oauth-controller");

router.get("/authorization", oauthController.authorize);
router.get("/oauth/callback", oauthController.callback);

module.exports = router;
