const path = require("path");
const publicPath = path.join(__dirname, "..", "public");
const bodyParser = require('body-parser');
const express = require("express");
const mongoose = require("mongoose");
const Stock = require("../src/models/stock.js");
const routes = require("../src/routes/index.js");
var methodOverride = require('method-override');
const app = express();

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.Promise = global.Promise;
const url = process.env.MONGOLAB_URI;

mongoose.connect(url, (err) => {
  if (err) {
    console.log('Error when connecting:', err);
  } else {
    console.log('Server connected to the database.');
  }
});

routes(app);


// LISTEN SERVER
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Listening on port 8080");
});

// const path = require("path");
// const publicPath = path.join(__dirname, "..", "public");
// const express = require("express");
// const Stock = require("../src/models/stock.js");
// const mongoose = require("mongoose");
// const routes = require("../src/routes/index.js");
// const app = express();


// app.use(express.static(publicPath));


// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGO_URI, (err) => {
//   if (err) {
//     console.log('Error when connecting:', err);
//   } else {
//     console.log('Server connected to the database.');
//   }
// });

// routes(app);

// // LISTEN SERVER
// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log("Listening on port 3000");
// });

