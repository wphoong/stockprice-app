const express = require("express");
const app = express();
const path = require("path");
const publicPath = path.join(__dirname, "..", "public");

app.use(express.static(publicPath));

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher(process.env.PUSHER_API_KEY, {
  cluster: 'us2',
  encrypted: true
});

var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
  alert(data.message);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// LISTEN SERVER
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Listening on port 3000");
});
