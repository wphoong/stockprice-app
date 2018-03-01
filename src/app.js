import React from "react";
import ReactDOM from "react-dom";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import ChartComponent from "./components/ChartComponent.js";

console.log("App.js is running");

const jsx = (
	<div>
		<h1>STOCK PRICE APP</h1>
		<ChartComponent />
	</div>
);

//for BABEL in command line
// babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch

ReactDOM.render(jsx, document.getElementById('app'));

