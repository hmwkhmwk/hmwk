const router = require("express").Router();
module.exports = router;

router.use("/student", require("./student"));
router.use("/homework", require("./homework"));
router.use("/homeworks", require("./homeworks"));
router.use("/api/hash", require("./hash"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
