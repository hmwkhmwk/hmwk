const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();

var bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
const port = process.env.PORT;

// logging middleware
app.use(morgan("dev")); // by default use "dev" format.

// parse various different custom JSON types as JSON
app.use(bodyParser.json());
app.use(routes);

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

app.listen(port, () =>
  console.log(`Quickstart app listening at http://localhost:${port}`)
);

module.exports = app;
