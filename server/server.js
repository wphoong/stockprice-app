"use strict";

const express = require("express");
const path = require("path");
const publicPath = path.join(__dirname, "..", "public");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
var Pusher = require('pusher');

//initialize Pusher with your appId, key and secret
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_API_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: 'us2',
    encrypted: true
});


const app = express();


app.use(cors());
app.use(express.static(publicPath));

app.get("/send", (req,res) => {
	pusher.trigger('post-actions', 'messages', {
	  "message": "hello world"
	});
});

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});


// LISTEN SERVER
const port = 3000;

app.listen(port, () => {
  console.log("Listening on port 3000");
});