/*only fill out info after pull from github*/
var mysql = require("mysql");


function dbCon(){
	var con = mysql.createConnection({
				host: "127.0.0.1",
				port:3306,
				user: "gphan",
				password: "ocbuu123",
				database:"oc_buu"});
	return con;
}

exports.dbCon = dbCon;
//exports.query = query;
