const express = require ('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

var dburl = process.env.DB;

var Organisation = require('../models/organisation.js');

router.get('/ice/organisation', (req, res, next) => {
	
	MongoClient.connect(dburl, {
			useNewUrlParser: true,
		    useUnifiedTopology: true
		}, function(err, db) {
        if (err) throw err;
        	var dbo = db.db("ice-app");
        	dbo.collection("organisation").findOne({}, function(err, result) {
	            if (err) throw err;
	            	res.json(result);
	            	db.close();
	        });
    });
});

router.get('/ice/organisation/:id', (req, res, next) => {
	
	MongoClient.connect(dburl, {
			useNewUrlParser: true,
		    useUnifiedTopology: true
		}, function(err, db) {
        if (err) throw err;
        	var dbo = db.db("ice-app");
        	dbo.collection("organisation").findOne({
        		id: req.params.id
        	}, function(err, result) {
	            if (err) throw err;
	            	res.json(result);
	            	db.close();
	        });
    });
});

module.exports = router;


