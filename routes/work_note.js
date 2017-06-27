"use strict";

var express = require('express');
var router = express.Router();
var mysqlCon = require('../myMiddlewares/mysqlCon');
var bodyParser = require('body-parser');
var Promise = require('promise');


router.use(bodyParser.urlencoded({extended:true}));

var conn = mysqlCon.dbCon();

/*****Start up work note page*********************************/
router.get('/', function(req, res, next){ //'/' taking care by get func in Router
	console.log('/work_note page started');
	//---a promise section---
	var queryNotesTbl = function(){
		console.log('selecting from gpweb_notes');
		return new Promise(function(resolve, reject){			
			conn.query('SELECT * FROM gpweb_notes', function(err, rows){
				var noteTitle = new Array();
				var noteId = new Array();
				if(err){throw err;}
				else{
					for (var i=0; i<rows.length; i++) {
						noteTitle[i] = rows[i].title;
						noteId[i] = rows[i].id;
					}			
					var notes2DArray = [noteId, noteTitle];					
					resolve(notes2DArray);
				}
			});			
		});
	};
	
	var rendr = function(notes2DArray){
		console.log('rendering on data on /work_note');
		return new Promise(function(resolve, reject){
			res.render('work_note',{        
				page_title: 'Work Notes',
				notes_2D_Array: notes2DArray
			});
			
		});
	};
	//execute promise 
	queryNotesTbl().then(function(notes2DArray){
		rendr(notes2DArray);
	});	
	//---end promise session--
});


router.post("/linkId", function(req, res, next){
	var clickedId = req.body.clicked_id; //parse only the clicked link
	
	conn.query('SELECT * FROM gpweb_note_content WHERE note_id=?', clickedId, function(err, rows){
		var noteContent = [];		
		if(err){throw err}
		else{
			for(var j=0; j<rows.length; j++){
				noteContent[j] = rows[j].note;
			}
			res.send({thisvalue:noteContent});
		}
		
	});	
});

router.post('/add', function(req, res){
	console.log('/add was requested');
	
	/*----start a promise section-------
		@insertIntoGpwebNotes().then(function(noteId) - noteId is the result from insertIntoGpwebNotes
		@then - function of promise
	*/
	var insertIntoGpwebNotes = function(){ 
		console.log('data is inserting into gpweb_notes');
		return new Promise(function(resolve, reject){			
			var noteValues = {
				id: '',
				title: req.body.noteTitle,
				date: new Date(),
				user: 'gphan'
			}
			conn.query('INSERT INTO gpweb_notes SET?', noteValues, function(err, res){
				if(err){throw err}	
				resolve(res.insertId); 				
			});		
		});
	};
	
	var res2post = function(noteId){		
		return new Promise(function(resolve, reject){
			//res.end();
			res.send({id:noteId});
			resolve(noteId);
		});
	};
	
	var insertIntoGpwebNoteContent = function(noteId){ 
		console.log('data is inserting into gpweb_note_content');
		return new Promise(function(resolve, reject){
			var noteContentValues ={
				id:'',
				note_id: noteId,
				note: req.body.noteContent,		
			}
			conn.query('INSERT INTO gpweb_note_content SET?', noteContentValues, function(err, res){
				if(err){throw err}
			});
		});
	};

	
	//execute promises 
	insertIntoGpwebNotes().then(function(noteId){
		return res2post(noteId);
	}).then(function(noteId){ 
		insertIntoGpwebNoteContent(noteId);
	});
	/*-----end promise section----*/
	
	//without this req will be time out and the page will be broken
	//res.redirect('/work_note'); 	
})



module.exports = router;
