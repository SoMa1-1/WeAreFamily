/** memoHandler.js **/ 

var Datastore = require('nedb'); 
var gps = require('./gps');
var home = require('./home');

var db_gps = gps.db;
var home = home.db;

 exports.start = function(req, res) { 
	var where = req.query;
	_findGps(where, function(error, results) { 
		console.log( {error: error, results: results});
	});
}; 

function _findGps(where, callback) { 
	where = where || {}; 
	db_gps.find(where, callback);  
} 