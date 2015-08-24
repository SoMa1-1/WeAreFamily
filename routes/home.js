var express = require('express'); 
var router = express.Router(); 
var home = require('../handlers/home'); 

 router.post('/', home.create);  

router.get('/', home.read);  

router.put('/', home.update);  

router.delete('/', home.remove);  

module.exports = router; 