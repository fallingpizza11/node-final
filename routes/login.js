var express = require('express');
var router = express.Router();
let path = require('path');
const passport = require('passport')
const Account = require('../models/account');


router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'login.html'))
})

router.post('/signup', (req, res, next) => {
    const newAccount = Account.register(new Account({username: req.body.username}), req.body.password, (err, user) => {

        if (err) return next(err)
        
        console.log('Hello: ', user.username)
    })

        
    res.redirect('/login')   // go to the index page now that the user has an account
})

router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), (req, res) => {
            // do login stuff
            
            res.redirect('/')
})

module.exports = router;
