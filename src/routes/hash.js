const router = require("express").Router();
const { newDB } = require("../db");
const db = newDB();
const HmwkService = require("../services/hmwk-service");

router.get("/api/hash/:token", async (req, res, next) => {
  try {
    const data = await db.getData(`/submit/${req.params.token}`);
    const { hmwkCompletionTrackingItemId } = data;
    const hmwkTrackingData = await HmwkService.getHmwkTrackingData(
      hmwkCompletionTrackingItemId
    );
    //KEEP THIS CONSOLE LOG IN ORDER TO REFORMAT THE hmwkTrackingData later on
    console.log("hmwkTrackingData", hmwkTrackingData);
    res.json(hmwkTrackingData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
