var express = require('express'); 
var router = express.Router(); 
var lock = require('../handlers/lock'); 

 router.post('/', lock.create);  

router.get('/', lock.read);  

router.put('/', lock.update);  

router.delete('/', lock.remove);  

module.exports = router; 