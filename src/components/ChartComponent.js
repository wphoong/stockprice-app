import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { startAddStock } from "../actions/stock.js";

class ChartComponent extends React.Component {
	state = {
		stock: "",
		stocks: ""
	};
	onTextChange = (e) => {
		const text = e.target.value;
		channel.bind('my-event', function(data) {
		  this.setState((prevState) => ({ stock: text.toUpperCase() }));
			console.log(this.state.stock);
		});
		// this.setState((prevState) => ({ stock: text.toUpperCase() }));
		// console.log(this.state.stock);
	};
	onSubmit = (e) => {
		e.preventDefault();
		const stocks = [...this.state.stocks, this.state.stock];
		console.log("new stock arr ", stocks);

		this.setState({ stocks: stocks }, () => { this.onCreateChart(); });
	};
	onCreateChart = () => {

		Highcharts.createElement('link', {
		   href: 'https://fonts.googleapis.com/css?family=Dosis:400,600',
		   rel: 'stylesheet',
		   type: 'text/css'
		}, null, document.getElementsByTagName('head')[0]);

		Highcharts.theme = {
		   colors: ['#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066',
		      '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
		   chart: {
		      backgroundColor: null,
		      style: {
		         fontFamily: 'Dosis, sans-serif'
		      }
		   },
		   title: {
		      style: {
		         fontSize: '16px',
		         fontWeight: 'bold',
		         textTransform: 'uppercase'
		      }
		   },
		   tooltip: {
		      borderWidth: 0,
		      backgroundColor: 'rgba(219,219,216,0.8)',
		      shadow: false
		   },
		   legend: {
		      itemStyle: {
		         fontWeight: 'bold',
		         fontSize: '13px'
		      }
		   },
		   xAxis: {
		      gridLineWidth: 1,
		      labels: {
		         style: {
		            fontSize: '12px'
		         }
		      }
		   },
		   yAxis: {
		      minorTickInterval: 'auto',
		      title: {
		         style: {
		            textTransform: 'uppercase'
		         }
		      },
		      labels: {
		         style: {
		            fontSize: '12px'
		         }
		      }
		   },
		   plotOptions: {
		      candlestick: {
		         lineColor: '#404048'
		      }
		   },


		   // General
		   background2: '#F0F0EA'

		};

		// Apply the theme
		Highcharts.setOptions(Highcharts.theme);

		var seriesOptions = [],
		    seriesCounter = 0;

		var names = this.state.stocks.length == 0 ? ["AAPL"] : this.state.stocks;

		const removeStock = (name) => {
			const stocks = this.state.stocks.filter((stock) => stock != name );
			this.setState({ stocks: stocks }, () => {
				alert("Stock Symbol doesn't exist, Please enter a valid Symbol");
			});
		};
		/**
		 * Create the chart when all data is loaded
		 * @returns {undefined}
		 */
		function createChart() {

		    Highcharts.stockChart('container', {

		        rangeSelector: {
		            selected: 4
		        },

		        yAxis: {
		            labels: {
		                formatter: function () {
		                    return (this.value > 0 ? ' + ' : '') + this.value + '%';
		                }
		            },
		            plotLines: [{
		                value: 0,
		                width: 2,
		                color: 'silver'
		            }]
		        },

		        plotOptions: {
		            series: {
		                compare: 'percent',
		                showInNavigator: true
		            }
		        },

		        tooltip: {
		            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
		            valueDecimals: 2,
		            split: true
		        },

		        series: seriesOptions
		    });
		}

		$.each(names, function (i, name) {
				const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&outputsize=full&symbol=" + name + "&apikey="+process.env.STOCK_API_KEY;

				const dataArr = [];

				$.getJSON(url, function(data) {

					if (data["Error Message"]) {
						removeStock(name);
					} else {

					$.each(data["Time Series (Daily)"], function(idx, time) {
						const unix = moment(idx, "YYYY-M-D").valueOf();
						const value = parseFloat(time["5. adjusted close"]).toFixed(2);
						dataArr.push([unix, Number(value)]);
					});

					dataArr.sort(function(a, b) {return a[0] - b[0]; });

					console.log(dataArr);

					seriesOptions[i] = {
		        	name: name,
		        	data: dataArr
		    	};

		    	// As we're loading the data asynchronously, we don't know what order it will arrive. So
		    	// we keep a counter and create the chart when all the data is loaded.
		    	seriesCounter += 1;

		    	if (seriesCounter === names.length) {
		            createChart();
		    	}

		    	}

				});

		});


	};
	onRemoveStock = (e) => {
		const stocks = this.state.stocks.filter((stock) => stock != e.target.value);
		this.setState({ stocks: stocks}, () => this.onCreateChart() );
	};
	componentDidMount = () => {

		console.log('mounted');
		// var pusher = new Pusher(process.env.PUSHER_API_KEY, {
		//   cluster: 'us2',
		//   encrypted: true
		// });

		// var channel = pusher.subscribe('my-channel');
		


		this.onCreateChart();

	};
	render() {
		return (
			<div className="jumbotron">
				<div className="offset-2">
					<div id="container" style={{ width: '70%', height: '400px'}}></div>
				</div>
				<div className="col-12">
					{
						this.state.stocks.length != 0 ? this.state.stocks.map((stock, index) => {
							return (
								<div className="col-2" key={index}>
									<h1>{stock} <span><button value={stock} onClick={this.onRemoveStock}>x</button></span></h1>
								</div>
							);
						}) : (<h1>Add a Stock Symbol</h1>)
					}
				</div>
				<div>
					<form onSubmit={this.onSubmit}>
						<input 
							type="text"
							placeholder="Stock Code"
							onChange={this.onTextChange}
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

const mapDispatchToProps = (dispatch) => ({
	startAddStock: (stock) => dispatch(startAddStock(stock))
});

export default connect(undefined, mapDispatchToProps)(ChartComponent);