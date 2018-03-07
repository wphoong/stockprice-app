import database from "../firebase/firebase.js";

export const addStock = (stock) => ({
	type: "ADD_STOCK",
	stock
});

export const startAddStock = (stock) => {
	return (dispatch) => {
		const stock = stock;
		return database.ref('stocks').set(stock).then((ref) => {
			dispatch(addStock(stock));
		});
	};
};