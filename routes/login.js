var express = require('express');
var router = express.Router();
let path = require('path')


router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'login.html'))
})

router.post('/:action', function(req, res) {
    if(req.params.action === 'signup') {
        // do signup stuff
        console.log('signup!')
    }
    else if(req.params.action === 'login') {
        // do login stuff
        console.log('login!')
    }
})

module.exports = router;
