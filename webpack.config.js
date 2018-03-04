const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
require("dotenv").config({ path: ".env"});

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.join(__dirname, 'public'),
    filename: "bundle.js"
  },
  module: {
    rules: [{
      loader: "babel-loader",
      test: /\.js$/,
      exclude: /node_modules/
    }, {
      test: /\.s?css$/,
      use: [
        "style-loader",
        "css-loader",
        "sass-loader"
      ]
    }]
  },
  plugins: [
      new webpack.DefinePlugin({
        "process.env.STOCK_API_KEY": JSON.stringify(process.env.STOCK_API_KEY),
        "process.env.PUSHER_APP_ID": JSON.stringify(process.env.PUSHER_APP_ID),
        "process.env.PUSHER_API_KEY": JSON.stringify(process.env.PUSHER_API_KEY),
        "process.env.PUSHER_SECRET": JSON.stringify(process.env.PUSHER_SECRET)
      })
    ],
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, 'public')
  }
};


