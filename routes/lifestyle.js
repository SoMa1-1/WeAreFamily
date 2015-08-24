var express = require('express'); 
var router = express.Router(); 
var lifestyle = require('../handlers/lifestyle'); 

 router.post('/', lifestyle.create);  

router.get('/', lifestyle.read);  

router.put('/', lifestyle.update);  

router.delete('/', lifestyle.remove);  

module.exports = router; 