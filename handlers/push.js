/** memoHandler.js **/ 

var Datastore = require('nedb'); 
var db = new Datastore({ filename: './data/push', autoload: true });  

exports.db = db;

 exports.create = function(req, res) {  
	var body = req.body;

	_insertPush(body , function(error, results) { 
		res.json( {error: error, results: results});
	});
}; 

 exports.read = function(req, res) { 
	var where = req.query;
	_findPush(where, function(error, results) { 
		res.json( {error: error, results: results});
	});
}; 

 exports.update = function(req, res, body) {  
	var where = req.query;
	var body = req.body;

	_updatePush(where, body, function(error, results) { 
		res.json( {error: error, results: results});
	});
}; 

 exports.remove = function(req, res, body) {  
	var where = req.query;

	_removePush(where, function(error, results) { 
		res.json( {error: error, results: results});
	});
};

function _insertPush(body, callback) { 
	body = typeof body === 'string' ? JSON.parse(body) : body; 

	var push = {
		t_duid: body.t_duid,
		m_duid: body.m_duid,
		name: body.name,
		relation: body.relation
	};
	db.insert(push, callback);  
} 
 
function _findPush(where, callback) { 
	where = where || {}; 
	db.find(where, callback);  
} 
 
function _updatePush(where, body, callback) { 
	db.update(where, {$set: body}, {multi: true}, callback);  
} 
 
function _removePush(where, callback) { 
	db.remove(where, {multi: true}, callback); 
}