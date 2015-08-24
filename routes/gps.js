var express = require('express'); 
var router = express.Router(); 
var gps = require('../handlers/gps'); 

 router.post('/', gps.create);  

router.get('/', gps.read);  

router.put('/', gps.update);  

router.delete('/', gps.remove);  

module.exports = router; 