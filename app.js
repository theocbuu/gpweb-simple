/*
	--app.js-- 
	get('/', ...) doesn't mean get '/', but get the index.ejs from views folder
	'/' is a request parameter
	__dirname is the path of where the file is in; example: use __dirname in here = /home/gphan/gpweb/
*/

var express = require('express');
var index = require('./routes/index');
var path = require('path');




var bodyParser = require('body-parser');


var auth = require('./myMiddlewares/auth');
var index = require('./routes/index');
var work_note = require('./routes/work_note');
var testing = require('./routes/testing');

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', auth.authFunc('o', '1'));
app.use(express.static(__dirname + '/public'));
app.use('/', index); //this use an Object index not a function, and only work because we use router on indes.js
app.use('/work_note', work_note);
app.use('/work_note/linkId', work_note);


app.use('/testing', testing);
	


module.exports = app;

