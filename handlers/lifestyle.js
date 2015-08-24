/** memoHandler.js **/ 

var Datastore = require('nedb'); 
var db = new Datastore({ filename: './data/lifestyle', autoload: true });  

 exports.create = function(req, res) {  
	var body = req.body;

	_insertLifeStyle(body , function(error, results) { 
		res.json( {error: error, results: results});
	});
}; 

 exports.read = function(req, res) { 
	var where = req.query;
	_findLifeStyle(where, function(error, results) { 
		res.json( {error: error, results: results});
	});
}; 

 exports.update = function(req, res, body) {  
	var where = req.query;
	var body = req.body;

	_updateLifeStyle(where, body, function(error, results) { 
		res.json( {error: error, results: results});
	});
}; 

 exports.remove = function(req, res, body) {  
	var where = req.query;

	_removeLifeStyle(where, function(error, results) { 
		res.json( {error: error, results: results});
	});
};

function _insertLifeStyle(body, callback) { 
	body = typeof body === 'string' ? JSON.parse(body) : body; 

	var tv = {
		m_duid: body.t_duid,
		date: body.date,
		move: body.move,
		sleep: body.sleep,
		p_using: body.p_using
	};
	db.insert(tv, callback);  
} 
 
function _findLifeStyle(where, callback) { 
	where = where || {}; 
	db.find(where, callback);  
} 
 
function _updateLifeStyle(where, body, callback) { 
	db.update(where, {$set: body}, {multi: true}, callback);  
} 
 
function _removeLifeStyle(where, callback) { 
	db.remove(where, {multi: true}, callback); 
}