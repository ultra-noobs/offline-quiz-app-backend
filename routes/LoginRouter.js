var express = require('express');
var router = express.Router();

router
.get('/', function(req, res, next) {
  console.log('get req at login')  
})

.post('/', (req, res, next) => {
  console.log(req.body);
})

module.exports = router;
