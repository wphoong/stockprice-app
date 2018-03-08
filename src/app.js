import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import pusherConfig from "./pusher/pusher.js";
import configureStore from "./store/configureStore.js";
import createHistory from "history/createBrowserHistory";
import ChartComponent from "./components/ChartComponent.js";
import StocksComponent from "./components/StocksComponent.js";
import { startSetStocks } from "./actions/stock.js";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

// config for pusher
pusherConfig();

// configure store
const store = configureStore();

const history = createHistory();

console.log("App.js is running");

const AppRouter = () => (
	<Router history={history}>
		<div>
			<Switch>
				<Route path="/" component={ChartComponent} exact={true} />
			</Switch>
		</div>
	</Router>
);

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

//for BABEL in command line
// babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
const renderApp = () => {
	ReactDOM.render(jsx, document.getElementById('app'));
};

// renderApp();

store.dispatch(startSetStocks()).then(() => {
	renderApp();
});

store.subscribe(() => {
  const state = store.getState();
  console.log(state);
});

