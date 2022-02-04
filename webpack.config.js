const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/App.js",
  mode: "development",
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  output: {
    path: path.join(__dirname, "/dist/"),
    publicPath: "./dist/",
    filename: "../bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
