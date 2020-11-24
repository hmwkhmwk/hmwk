const router = require("express").Router();
const { newDB } = require("../db");
const db = newDB();
const HmwkService = require("../services/hmwk-service");

// document.location.href

router.get("/api/hash/:token", async (req, res, next) => {
  try {
    const data = await db.getData(`/submit/${req.params.token}`);
    const { hmwkCompletionTrackingItemId } = data;
    const hmwkTrackingData = await HmwkService.getHmwkTrackingData(
      hmwkCompletionTrackingItemId
    );
    console.log("hmwkTrackingData", hmwkTrackingData);
    res.json(hmwkTrackingData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// Link https://www.hmwk.herokuapp.com/submission?token=f2c57a06a7fe968f59c76bf8fb68177b7f433200
