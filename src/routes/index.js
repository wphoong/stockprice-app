'use strict';

const path = process.cwd();

module.exports = function(app) {
	const stockHandler = require("../controllers/stockController.js");

	app.get("/stocks", (req, res) => {
		stockHandler.listStocks(req, res);
	});

	app.get("/", (req, res) => {
		res.render(path + '/public/index.html.ejs');
	});

		// .get(stockHandler.listStocks);
	// app.route("/api/stocks/:stockid")
	// 	.put(stockHandler.updateStock)
	// 	.delete(stockHandler.deleteStock);
};