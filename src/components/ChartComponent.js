import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { startAddStock } from "../actions/stock.js";
import CreateChartComponent from "./CreateChartComponent.js";
import StockListComponent from "./StockListComponent.js";

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
		// var pusher = new Pusher(process.env.PUSHER_API_KEY, {
		//   cluster: 'us2',
		//   encrypted: true
		// });
		// var channel = pusher.subscribe('my-channel');
		// const callback = () => {
		// 	console.log(this.state.stock + "added");
		// };
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
	componentDidMount = () => {
		console.log("CURRENT STATE ",this.props.stocks);
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
	startAddStock: (stock) => dispatch(startAddStock(stock))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartComponent);