/*
 this is for authentication to my site
*/
var basicAuth = require('../node_modules/basic-auth');

function authFunc(username, password){
	return function(req, res, next){
		var user = basicAuth(req);
		if(!user || user.name != username || user.pass != password){
			res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
			return res.sendStatus(401);
		}
		next();
	};
};

exports.authFunc = authFunc;