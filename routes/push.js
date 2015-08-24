var express = require('express'); 
var router = express.Router(); 
var push = require('../handlers/push'); 

 router.post('/', push.create);  

router.get('/', push.read);  

router.put('/', push.update);  

router.delete('/', push.remove);  

module.exports = router; 