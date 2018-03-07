import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore.js";
import createHistory from "history/createBrowserHistory";
import ChartComponent from "./components/ChartComponent.js";
import StocksComponent from "./components/StocksComponent.js";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();
const history = createHistory();

console.log("App.js is running");

const AppRouter = () => (
	<Router history={history}>
		<div>
			<Switch>
				<Route path="/" component={ChartComponent} exact={true} />
				<Route path="/stocks" component={StocksComponent} exact={true} />
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

ReactDOM.render(jsx, document.getElementById('app'));

