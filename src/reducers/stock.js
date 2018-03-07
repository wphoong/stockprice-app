const stockReducerDefaultState = [];

const stockReducer = (state = stockReducerDefaultState, action) => {
	switch (action.type) {
		case "ADD_STOCK":
			return action.stock;

		default:
			return state;
	}
};

export default stockReducer;