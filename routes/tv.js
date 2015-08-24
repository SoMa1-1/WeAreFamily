var express = require('express'); 
var router = express.Router(); 
var tv = require('../handlers/tv'); 

 router.post('/', tv.create);  

router.get('/', tv.read);  

router.put('/', tv.update);  

router.delete('/', tv.remove);  

module.exports = router; 