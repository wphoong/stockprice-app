"use strict";

const path = process.cwd();
const mongoose = require("mongoose");
const Stock = mongoose.model('Stock');


exports.listStocks = (req, res) => {

	Stock.find((err, stocks) => {
		if (err) return res.send(err);
		console.log("Stocks ", JSON.stringify(stocks));
		res.json(stocks);

	});

};

exports.updateStock = (req, res) => {

};

exports.deleteStock = (req, res) => {

};


