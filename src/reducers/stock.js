const stockReducerDefaultState = [];

const stockReducer = (state = stockReducerDefaultState, action) => {
	switch (action.type) {
		case "ADD_STOCK":
			return [...state, action.stock];
		case "REMOVE_STOCK":
			return state.filter(({id}) => id != action.id);
		case "SET_STOCKS":
			return action.stocks;
		default:
			return state;
	}
};

export default stockReducer;