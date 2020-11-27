const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const path = require("path");

var bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
const port = process.env.PORT;

// logging middleware
app.use(morgan("dev")); // by default use "dev" format.

// parse various different custom JSON types as JSON
app.use(bodyParser.json());
app.use(routes);

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

app.listen(port, "0.0.0.0", () =>
  console.log(`Quickstart app listening at http://localhost:${port}`)
);

module.exports = app;
