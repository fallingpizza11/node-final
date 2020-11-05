var express = require('express');
var router = express.Router();
let path = require('path')

router.get('/:orderId', isLoggedIn, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'review.html'))
})

router.get('/', isLoggedIn, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'review.html'))
})

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    console.log('you have access');
    return next()
  }
  console.log('i banish u to the shadow realm');
  res.redirect('/login')
}

module.exports = router;
