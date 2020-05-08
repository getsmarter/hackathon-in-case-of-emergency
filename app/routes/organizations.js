const express = require ('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

var dburl = process.env.DB;

router.get('/organizations', (req, res, next) => {
	
	MongoClient.connect(dburl, {
			useNewUrlParser: true,
		    useUnifiedTopology: true
		}, function(err, db) {
			
        if (err) throw err;
        
        var dbo = db.db('ice-app');
        dbo.collection('organisation').find({}).toArray(function (err, result) {
	        if (err) {
	            res.send(err);
	        } else {
	            res.send(JSON.stringify(result));
	        }
    	});
    });
});

router.get('/organizations/:id', (req, res, next) => {
	
	MongoClient.connect(dburl, {
			useNewUrlParser: true,
		    useUnifiedTopology: true
		}, function(err, db) {
        if (err) throw err;
        	var dbo = db.db('ice-app');
        	dbo.collection('organisation').findOne({
        		id: req.params.id
        	}, function(err, result) {
	            if (err) throw err;
	            	res.json(result);
	            	db.close();
	        });
    });
});

router.post('/organizations/create', (req, res, next) => {
	
	MongoClient.connect(dburl, {
			useNewUrlParser: true,
		    useUnifiedTopology: true
		}, function(err, db) {
        if (err) throw err;
        	
        	console.log(req);

        	var dbo = db.db('ice-app');
        	dbo.collection('organisation').insert({
        		id: req.body.id,
        		description: req.body.description
        	}, function(err, result) {
	            if (err) throw err;
	            	res.json(result);
	            	db.close();
	        });
    });
});

module.exports = router;


