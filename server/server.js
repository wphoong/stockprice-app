"use strict";

const express = require("express");
const path = require("path");
const publicPath = path.join(__dirname, "..", "public");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(cors());
app.use(express.static(publicPath));
// Body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// LISTEN SERVER
const port = 3000;

io.on('connection', (socket) => {
	console.log("connected to stock price app");

	socket.on('updating', (data) => {
		console.log(data);

		io.emit('updated', data);

	});
});

// app.listen(port, () => {
//   console.log("Listening on port 3000");
// });

server.listen(port, () => {
  console.log("Listening on port 3000");
});