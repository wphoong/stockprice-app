"use strict";

const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});


// LISTEN SERVER
const port = 8080;

app.listen(port, () => {
  console.log("Listening on port 8080");
});