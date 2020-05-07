const express = require ('express');
const router = express.Router();

router.get('/ice', (req, res, next) => {
	res.send('Welcome to ice app, this is the base end point');
});

module.exports = router;


