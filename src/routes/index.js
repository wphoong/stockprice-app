'use strict';

const path = require("path");
const publicPath = path.join(__dirname, "..", "public");

module.exports = function(app) {
	const stockHandler = require("../controllers/stockController.js");

	app.get("/", (req, res) => {
		res.sendFile(path.join(publicPath, "index.html"));
	});

	app.get("/stocks", (req, res) => {
		stockHandler.listStocks(req, res);
	});
		// .get(stockHandler.listStocks);
	// app.route("/api/stocks/:stockid")
	// 	.put(stockHandler.updateStock)
	// 	.delete(stockHandler.deleteStock);
};