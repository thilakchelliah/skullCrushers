var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'TechRegistry', dev: 'true' });
});

router.get('/dashboard', function(req, res, next) {
    res.render('dashboard', { title: 'TechRegistry', dev: 'true' });
});

module.exports = router;
