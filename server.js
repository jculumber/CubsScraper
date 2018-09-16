// Require dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

// Set up port to be either localhost's designated port or 3000
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Set up Express Router
var router = express.Router();

// Require routes files and pass router object
require("./config/routes")(router);

// Designate public folder as a static directory
app.use(express.static(__dirname + "/public"));

// Connect Handlebars to Express app
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use bodyParser in app
app.use(bodyParser.urlencoded({
    extended: false
}));

// Every request goes through router middleware
app.use(router);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Listen on the port
app.listen(PORT, function() {
    console.log("Listening on port:" + PORT);
})