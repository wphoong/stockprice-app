import database from "../firebase/firebase.js";

export const addStock = (stock) => ({
	type: "ADD_STOCK",
	stock
});

export const startAddStock = (stock = {}) => {
	return (dispatch) => {
		const newStock = stock.toUpperCase();
		return database.ref('stocks').push(newStock).then((ref) => {
			dispatch(addStock({
				id: ref.key,
				stock: newStock
			}));
			
		});
	};
};

export const editStock = (id, update) => ({
	type: "EDIT_STOCK",
	id,
	updates
});

export const startEditStock = (id, updates) => {
	return (dispatch) => {
		return database.ref('stocks').update({ id: updates }).then(() => {
			dispatch(editStock(id, updates));
		})
	};
};

export const removeStock = ({id} = {}) => ({
	type: "REMOVE_STOCK",
	id
});

export const startRemoveStock = ({id} = {}) => {
	return (dispatch) => {
		return database.ref(`stocks/${id}`).remove().then(() => {
			dispatch(removeStock({id}));
		});
	};
};

export const setStocks = (stocks) => ({
	type: "SET_STOCKS",
	stocks
});

export const startSetStocks = () => {
	return (dispatch) => {
		return database.ref('stocks').once('value').then((snapshot) => {
			const stockList = [];

			snapshot.forEach((childSnapshot) => {
				stockList.push({
					id: childSnapshot.key,
					stock: childSnapshot.val()
				});
			});
			dispatch(setStocks(stockList));
		});
	};
};
