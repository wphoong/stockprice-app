const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
require("dotenv").config({ path: ".env"});

module.exports = {
  entry: ["babel-polyfill", "./src/app.js"],
  output: {
    path: path.join(__dirname, 'public', "dist"),
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
        "process.env.PUSHER_SECRET": JSON.stringify(process.env.PUSHER_SECRET),
        "process.env.FIREBASE_API_KEY": JSON.stringify(process.env.FIREBASE_API_KEY),
        "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        "process.env.FIREBASE_DATABASE_URL": JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        "process.env.FIREBASE_PROJECT_ID": JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        "process.env.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
      }),
      new webpack.DefinePlugin({
        "typeof window": "\"object\""
      })
    ],
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    publicPath: "/dist/"
  }
};


