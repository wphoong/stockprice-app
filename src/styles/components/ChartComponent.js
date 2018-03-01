import React from 'react';

class ChartComponent extends React.Component {
	componentDidMount = () => {

		console.log('mounted');
		/* global document */
		// Load the fonts
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
		    seriesCounter = 0,
		    names = ['MSFT', 'AAPL', 'GOOG'];

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

		    $.getJSON('https://www.highcharts.com/samples/data/' + name.toLowerCase() + '-c.json',    function (data) {

		        seriesOptions[i] = {
		            name: name,
		            data: data
		        };

		        // As we're loading the data asynchronously, we don't know what order it will arrive. So
		        // we keep a counter and create the chart when all the data is loaded.
		        seriesCounter += 1;

		        if (seriesCounter === names.length) {
		            createChart();
		        }
		    });
		});

	};
	render() {
		return (
			<div className="jumbotron">
				<div className="offset-2">
					<div id="container" style={{ width: '70%', height: '400px'}}></div>
				</div>
			</div>
		);
	}
};

export default ChartComponent;