const path = require("path");

module.exports = {
  mode: "production",
  entry: "./client/index.js",
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  // resolve: {
  //   extensions: [".js", ".jsx"],
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
