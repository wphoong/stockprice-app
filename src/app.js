import React from "react";
import ReactDOM from "react-dom";
// import Pusher from "pusher";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import ChartComponent from "./components/ChartComponent.js";

console.log("App.js is running");

// var pusher = new Pusher({
//   appId: process.env.PUSHER_APP_ID,
//   key: process.env.PUSHER_API_KEY,
//   secret: process.env.PUSHER_SECRET,
//   cluster: 'us2',
//   encrypted: true
// });

// pusher.trigger('my-channel', 'my-event', {
//   "message": "hello world"
// });

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

const jsx = (
	<div>
		<h1>STOCK PRICE APP</h1>
		<ChartComponent />
	</div>
);

//for BABEL in command line
// babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch

ReactDOM.render(jsx, document.getElementById('app'));

