const router = require("express").Router();
// const { getAllHmwks } = require("../services/hmwk-service");

// Gets Grades, Group ID (name of the assignment)
router.get("/homeworks", async (req, res, next) => {
  try {
    const homeworks = await getHmwkDetail();
    res.json(homeworks);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
