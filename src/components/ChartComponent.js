import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { startAddStock, startSetStocks } from "../actions/stock.js";
import CreateChartComponent from "./CreateChartComponent.js";
import StockListComponent from "./StockListComponent.js";
import axios from 'axios';

class ChartComponent extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			stock: "",
			stocks: this.props.stocks ? this.props.stocks : this.props.startAddStock("AAPL")
		};
	};
	onTextChange = (e) => {
		const text = e.target.value.replace(/\s/g, "");
		this.setState((prevState) => ({ stock: text.toUpperCase() }));
	};
	onSubmit = (e) => {
		e.preventDefault();

		const names = [];
		this.state.stocks.forEach((stock) => {
			names.push(stock.stock);
		});

		if (!names.includes(this.state.stock)) {
			this.props.startAddStock(this.state.stock);		

			this.setState({stock: "" });

		} else {
			alert(this.state.stock + ' is already added');
		}

	};
	render() {
		return (
			<div className="jumbotron">
				<div className="offset-2">
					<CreateChartComponent />
				</div>
				<div className="col-12">
					<StockListComponent />
				</div>
				<div>
					<form onSubmit={this.onSubmit}>
						<input 
							type="text"
							placeholder="Stock Code"
							onChange={this.onTextChange}
							value={this.state.stock}
						/>
						<input 
							type="submit"
						/>
					</form>
				</div>
			</div>
		);
	}
};

const mapStateToProps = (state) => ({
	stocks: state.stocks
});

const mapDispatchToProps = (dispatch) => ({
	startSetStocks: () => dispatch(startSetStocks()),
	startAddStock: (stock) => dispatch(startAddStock(stock))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartComponent);