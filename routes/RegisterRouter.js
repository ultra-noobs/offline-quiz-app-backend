var express = require('express');
var router = express.Router();

router
.get('/', function(req, res, next) {
    console.log(req.body);
})

.post('/', (req, res, next) => {
    console.log(req.body);
})

module.exports = router;
