import React from 'react';
import { connect } from 'react-redux';
import { startRemoveStock } from '../actions/stock.js';

const StockListComponent = (props) => {
	const onRemove = (e) => {
		const id = e.target.id;
		console.log(id);
		props.startRemoveStock({id: id});
	};
	return (
		<div>
			{
				props.stocks.length != 0 ? props.stocks.map(({id, stock}) => {
					return (
						<div className="col-2" key={id}>
							<h1>{stock} <span><button id={id} onClick={onRemove}>x</button></span></h1>
						</div>
					);
				}) : (<h1>Add a Stock Symbol</h1>)
			}
		</div>
	);
};

const mapStateToProps = (state) => ({
	stocks: state.stocks
});

const mapStateToDispatch = (dispatch) => ({
	startRemoveStock: ({id}) => dispatch(startRemoveStock({id}))
});

export default connect(mapStateToProps, mapStateToDispatch)(StockListComponent);
