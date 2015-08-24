var express = require('express'); 
var router = express.Router(); 
var pairing = require('../handlers/pairing'); 

 router.post('/', pairing.create);  

router.get('/', pairing.read);  

router.put('/', pairing.update);  

router.delete('/', pairing.remove);  

module.exports = router; 