const router = require("express").Router();
const { getHmwkDetail } = require("../services/hmwk-service");

// Gests "Grade" and "Comment" based on "Student ID" & "Group Title" (name of the hmwk)
router.get("/homework", async (req, res, next) => {
  try {
    const homework = await getHmwkDetail();
    res.json(homework);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
