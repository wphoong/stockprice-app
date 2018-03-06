"use strict";

const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Stock = require("../src/models/stock.js");
const routes = require("../src/routes/index.js");
const methodOverride = require('method-override');

const app = express();
require("dotenv").load();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.set("views", 'public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(methodOverride('_method'));

mongoose.Promise = global.Promise;
const url = process.env.MONGO_URI;
// const url = process.env.MONGOLAB_URI;

mongoose.connect(url, (err) => {
  if (err) {
    console.log('Error when connecting:', err);
  } else {
    console.log('Server connected to the database.');
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});


// LISTEN SERVER
const port = 8080;

app.listen(port, () => {
  console.log("Listening on port 8080");
});