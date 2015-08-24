/** memoHandler.js **/ 
require('date-utils');
var Datastore = require('nedb'); 
var db = new Datastore({ filename: './data/lock', autoload: true });  

 exports.create = function(req, res) {  
	var body = req.body;

	_insertLock(body , function(error, results) { 
		res.json( {error: error, results: results});
	});
}; 

 exports.read = function(req, res) { 
	var where = req.query;

	if(where.date != undefined && where.m_duid != undefined) {
		if(where.event == 0) {
			_findLockStartday(where, function(error, results) {
				res.json( {error: error, results: results});
			});
		} else if(where.event == 1) {
			_findLockEndday(where, function(error, results) {
				res.json( {error: error, results: results});
			});
		} else {
			_findLockOneday(where, function(error, results) {
				res.json( {error: error, results: results});
			});
		}
	} else {
		_findLock(where, function(error, results) { 
			res.json( {error: error, results: results});
		});
	}
}; 

 exports.update = function(req, res, body) {  
	var where = req.query;
	var body = req.body;

	_updateLock(where, body, function(error, results) { 
		res.json( {error: error, results: results});
	});
}; 

 exports.remove = function(req, res, body) {  
	var where = req.query;

	_removeLock(where, function(error, results) { 
		res.json( {error: error, results: results});
	});
};

function _insertLock(body, callback) { 
	body = typeof body === 'string' ? JSON.parse(body) : body; 

	var lock = {
		m_duid: body.m_duid,
		date: new Date(),
		event: body.event
	};
	db.insert(lock, callback);  
} 
 
function _findLock(where, callback) { 
	where = where || {}; 
	db.find(where, callback);  
} 


function _findLockOneday(where, callback) { 
	var input_date = where.date;
	db.find({
		m_duid: where.m_duid,
	    date: {
	        $gte: new Date(input_date + "T00:00:00.000Z"),
	        $lt: new Date(input_date + "T23:59:59.000Z")
	    }
	}).sort( { date: 1 } ).exec(callback);
} 

function _findLockStartday(where, callback) { 
	var input_date = where.date;
	db.findOne({
		m_duid: where.m_duid,
	    date: {
	        $gte: new Date(input_date + "T04:00:00.000Z"),
	        $lt: new Date(input_date + "T13:00:00.000Z")
	    }
	}).sort( { date: 1 } ).exec(callback);
} 

function _findLockEndday(where, callback) { 
	var input_date = where.date;

	var start_day = new Date(input_date);
	start_day.addDays(-1);
	start_day.addHours(11);

	console.log("start_day : " + start_day);

	db.find({
		m_duid: where.m_duid,
	    date: {
	        $gte: start_day,
	        $lt: new Date(input_date + "T05:00:.000Z")
	    }
	}).sort( { date: -1 } ).exec(callback);
} 
 
function _updateLock(where, body, callback) { 
	db.update(where, {$set: body}, {multi: true}, callback);  
} 
 
function _removeLock(where, callback) { 
	db.remove(where, {multi: true}, callback); 
}