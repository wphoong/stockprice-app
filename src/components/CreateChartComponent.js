import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { startRemoveStock } from '../actions/stock.js';

class	CreateChartComponent extends React.Component {
	constructor(props) {
		super(props);
	}
	chartTheme = () => {
		//Chart Theme
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
	};
	onCreateChart = (nextProps) => {
		// Data for Chart Creation

		var seriesOptions = [],
		    seriesCounter = 0;

		var names = [];

		if (nextProps == undefined) {
			this.props.stocks.forEach((stock) => {
				names.push(stock.stock);
			});
		} else {
			nextProps.stocks.forEach((stock) => {
				names.push(stock.stock);
			});
			console.log(nextProps.stocks);
		}
		
		console.log("names: ", names);

		// const removeStock = (name) => {
		// 	const stocks = this.state.stocks.filter((stock) => stock != name );
		// 	this.setState({ stocks: stocks }, () => {
		// 		alert("Stock Symbol doesn't exist, Please enter a valid Symbol");
		// 	});
		// };
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

		let currentState = this.props.stocks;
		const removeStock = (name) => {
			alert("Stock Symbol doesn't exist, Please enter a valid Symbol");
			const currentStock = this.props.stocks.find((stock) => stock.stock == name);
			console.log("ID", currentStock.id);
			this.props.startRemoveStock({id: currentStock.id});
			this.socket.emit('updating', 'removed stock');
		};

		$.each(names, function (i, name) {
				const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&outputsize=full&symbol=" + name + "&apikey="+process.env.STOCK_API_KEY;

				const dataArr = [];

				$.getJSON(url, function(data) {

					if (data["Error Message"]) {
						console.log("ERRoR message");
						removeStock(name);
					} else {

						$.each(data["Time Series (Daily)"], function(idx, time) {
							const unix = moment(idx, "YYYY-M-D").valueOf();
							const value = parseFloat(time["5. adjusted close"]).toFixed(2);
							dataArr.push([unix, Number(value)]);
						});

						dataArr.sort(function(a, b) {return a[0] - b[0]; });

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
	componentDidMount = () => {
		console.log('create chart mounted');
		console.log('props: ', this.props.stocks);
		this.chartTheme();
		this.onCreateChart();
	};
	componentWillUpdate = (nextProps) => {
		console.log('next props', nextProps);
		this.onCreateChart(nextProps);
	};
	render() {
		return (
			<div>
				<div id="container" style={{ width: '70%', height: '400px'}}></div>
			</div>
		);
	}
};

const mapStateToProps = (state) => ({
	stocks: state.stocks
});

const mapStateToDispatch = (dispatch) => ({
	startRemoveStock: ({id}) => dispatch(startRemoveStock({id}))
});

export default connect(mapStateToProps, mapStateToDispatch)(CreateChartComponent);