var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send("listening your request ");
});

module.exports = router;
