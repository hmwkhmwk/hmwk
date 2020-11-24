const router = require("express").Router();
module.exports = router;

router.use("/api/hash", require("../routes/hash"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
