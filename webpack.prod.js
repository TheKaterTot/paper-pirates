const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["env", "react", "stage-0"]
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [],
  entry: path.resolve(__dirname, "client/index.jsx"),
  output: {
    filename: "index.bundle.js",
    path: path.resolve(__dirname, "public/js")
  },
  mode: "development"
};
