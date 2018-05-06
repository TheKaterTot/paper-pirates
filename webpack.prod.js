const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",

        options: {
          presets: ["env"]
        }
      }
    ]
  },

  plugins: [],
  entry: path.resolve(__dirname, "client/index.js"),
  output: {
    filename: "index.bundle.js",
    path: path.resolve(__dirname, "public/js")
  },

  mode: "production"
};
