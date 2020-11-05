var express = require('express');
var router = express.Router();
const path = require('path')

router.get('/', isLoggedIn, function(req, res, next) {
  console.log('rendering page..');
      res.sendFile(path.join(__dirname, '../public', 'history.html'))

});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    console.log('you have access');
    return next()
  }
  console.log('i banish u to the shadow realm');
  res.redirect('/login')
}


module.exports = router;
