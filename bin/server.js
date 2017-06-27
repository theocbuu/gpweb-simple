var http = require("http");
var url = require("url");
var app = require('../app');



var server = http.createServer(app).listen(8080);


