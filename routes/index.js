var express = require('express');
var router = express.Router();

	
router.get('/', function(req, res, next){
	console.log('in index.js');
	res.render('index', {title: 'GiangPhan'});
});



module.exports = router;
