var express = require('express');
var router = express.Router();
let path = require('path')

router.get('/:orderId', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'review.html'))
})

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'review.html'))
})

module.exports = router;
