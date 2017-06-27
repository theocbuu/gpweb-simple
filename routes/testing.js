var express = require('express');
var router = express.Router();

	
router.get('/', function(req, res, next){
	console.log('in testing.js');
	res.render('testing', {title: 'testing'});
});



module.exports = router;