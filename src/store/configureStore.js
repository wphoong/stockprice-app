import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import stockReducer from "../reducers/stock.js";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	const store = createStore(
		combineReducers({
			stock: stockReducer
		}),
		composeEnhancers(applyMiddleware(thunk)),
	);
	return store;
}