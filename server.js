var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var logger = require('morgan');

var app = express();
var db;

app.use(express.static('static'));

app.use(bodyParser.json());
app.use(logger('dev'));

app.get('/pacientes', function(req, res) {
	console.log("Query string", req.query);    
    db.collection("pacientes").find().toArray(function(err, docs) {      
      console.log(docs);
    	res.json(docs);
  	});    
});


MongoClient.connect('mongodb://localhost/pacientes', function(err, dbConnection) {
  db = dbConnection;
  var server = app.listen(3000, function() {
	  var port = server.address().port;
	  console.log("Started server at http://localhost:3000");
  });
});
