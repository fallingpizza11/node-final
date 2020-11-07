var express = require('express');
var router = express.Router();
const path = require('path')

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  console.log('rendering page for: ', req.user.username);
      res.sendFile(path.join(__dirname, '../public', 'index.html'))

});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next()
  }
  console.log('i banish u to the shadow realm');
  res.redirect('/login')
}



module.exports = router;
