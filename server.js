// server.js


	var express  = require('express');
	var app      = express();                               // create our app w/ express
	var mongoose = require('mongoose');                     // mongoose for mongodb
	var morgan = require('morgan');             // log requests to the console (express4)
	var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
	var methodOverride = require('method-override');
	var mongojs = require("mongojs")
	var ObjectId = mongojs.ObjectId;


	var db = mongojs('mydb', ['goods','defaultinfo', 'moredefault']);
	db.collection('defaultinfo').insert({name:"Default"});
	db.collection('moredefault').insert({name:"moredefault"});



	app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
	app.use(morgan('dev'));                                         // log every request to the console
	app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
	app.use(bodyParser.json());                                     // parse application/json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
	app.use(methodOverride());
	  

	app.get('/goods/', function(req, res) {
		

		
		db.goods.find(function(err, goods) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			console.log(goods)
			res.json(goods); 
		});
	});

   
	app.post('/goods', function(req, res) {

		
		db.collection('goods').insert({
			name : req.body.text,
		   
		}, function(err, good) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			db.goods.find(function(err, goods) {
				if (err)
					res.send(err)
				res.json(goods);
			});
		});

	});


	 app.get('/first/', function(req, res) {
		

		db.defaultinfo.find(function(err, defaultinfo){
		if (err)
			res.send(err)
		console.log(defaultinfo);
		res.json(defaultinfo)
	});
	});

	  app.get('/second/', function(req, res) {
		

		db.moredefault.find(function(err, moredefault){
		if (err)
			res.send(err)
		console.log(moredefault);
		res.json(moredefault)
	});
	});
	   

app.delete('/goods/:good_id', function(req, res) {
		  var query = {
			_id: req.params.good_id

		};
		console.log(query)


		db.goods.remove({_id: ObjectId(req.params.good_id)}, function(err) {
		  if (!err) console.log('deleted!');
		});
			db.goods.find(function(err, goods) {
				if (err)
					res.send(err)
				res.json(goods);
			});


	});

app.put('/goods/:good_id/', function(req, res) {
	console.log("start");
	console.log(req.body);


		

		db.goods.update({_id: ObjectId(req.params.good_id)}, {name:req.body.text} );
			db.goods.find(function(err, goods) {
				if (err)
					res.send(err)
				res.json(goods);
			});
	
	});

	app.listen(8080);
	console.log("App listening on port 8080");

	//module.exports = server;