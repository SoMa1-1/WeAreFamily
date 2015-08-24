/** memoHandler.js **/ 

var Datastore = require('nedb'); 
var push = require('./push');

var db = new Datastore({ filename: './data/home', autoload: true });  
var db_push = push.db;

exports.db = db;

 exports.create = function(req, res) {  
	var body = req.body;
	var where = req.query;

	_insertHome(body, function(error, results) { 
		res.json( {error: error, results: results});
	});

	if(where.t_duid != undefined) {
		_updatePushHome(where, body, function(error, results) { 
		
		});
	}
	
}; 

 exports.read = function(req, res) { 
	var where = req.query;
	_findHome(where, function(error, results) { 
		res.json( {error: error, results: results});
	});
}; 

 exports.update = function(req, res, body) {  
	var where = req.query;
	var body = req.body;

	_updateHome(where, body, function(error, results) { 
		res.json( {error: error, results: results});
	});
}; 

 exports.remove = function(req, res, body) {  
	var where = req.query;

	_removeHome(where, function(error, results) { 
		res.json( {error: error, results: results});
	});
};

function _insertHome(body, callback) { 
	body = typeof body === 'string' ? JSON.parse(body) : body; 

	var home = {
		t_duid: body.t_duid,
		lat: body.lat,
		lon: body.lon
	};
	db.insert(home, callback);  
} 
 
function _findHome(where, callback) { 
	where = where || {}; 
	db.find(where, callback);  
} 
 
function _updateHome(where, body, callback) { 
	db.update(where, {$set: body}, {multi: true}, callback);  
} 

function _updatePushHome(where, body, callback) { 
	db_push.update(where, {$set: body}, {multi: true}, callback);  
} 
 
function _removeHome(where, callback) { 
	db.remove(where, {multi: true}, callback); 
}