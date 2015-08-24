var express = require('express'); 
var router = express.Router(); 
var push_condition = require('../handlers/push_condition'); 

 router.post('/', push_condition.create);  

router.get('/', push_condition.read);  

router.put('/', push_condition.update);  

router.delete('/', push_condition.remove);  

module.exports = router; 