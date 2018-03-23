"use strict";

const express = require("express");
const path = require("path");
const publicPath = path.join(__dirname, "..", "public");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');


const app = express();


app.use(cors());
app.use(express.static(publicPath));
// Body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/api/send", (req, res) => {
	res.send('hi');
});

app.post("/api/send", (req,res) => {
	pusher.trigger('post-actions', 'messages', {
	  "message": "hello world"
	});
	console.log("created: true");
});


// LISTEN SERVER
const port = 3000;

app.listen(port, () => {
  console.log("Listening on port 3000");
});