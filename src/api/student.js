const router = require("express").Router();
const { getStudent } = require("../services/hmwk-service");

// Gets the student's name based on the student's ID
router.get("/student", async (req, res, next) => {
  try {
    //Get these from our hash:
    const studentName = await getStudent(hmwkCompletionTrackingItemId);
    res.json(studentName);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
