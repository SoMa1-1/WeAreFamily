var express = require('express'); 
var router = express.Router(); 
var monitor = require('../handlers/monitor'); 

router.get('/', monitor.start);  

module.exports = router; 