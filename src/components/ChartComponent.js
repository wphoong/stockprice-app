import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { startAddStock, startSetStocks } from "../actions/stock.js";
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
	onPusher = () => {
		// const pusher = new Pusher({
		//     appId: process.env.PUSHER_APP_ID,
		//     key: process.env.PUSHER_API_KEY,
		//     secret: process.env.PUSHER_SECRET,
		//     cluster: 'us2',
		//     encrypted: true
		// });

		
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
	componentWillMount = () => {
		const pusherKey = process.env.PUSHER_API_KEY;
		this.pusher = new Pusher(pusherKey, {
			cluster: 'us2',
			encrypted: true
		});

		this.channel = this.pusher.subscribe('post-actions');
	};
	componentDidMount = () => {
		Pusher.logToConsole = true;
		console.log("CURRENT STATE ",this.props.stocks);

		this.channel.bind('messages', function(data) {
		    // log message data to console - for debugging purposes
		    console.log(data);
		    // this.props.startSetStocks();
		}, this);

	};
	componentWillUnmount = () => {
		this.channel.unbind();
		this.pusher.unsubscribe(channel);
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