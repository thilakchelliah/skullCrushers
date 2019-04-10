// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'TechRegistry', dev: 'true' });
// });

// router.get('/dashboard', function(req, res, next) {
//     res.render('dashboard', { title: 'TechRegistry', dev: 'true' });
// });

// module.exports = router;

var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');

/* GET home page. */

router.get('/', async function(req, res, next) {
  let parms = { title: 'Home', active: { home: true } };

  const accessToken = await authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;

  if (accessToken && userName) {
    parms.user = userName;
    parms.debug = `User: ${userName}\nAccess Token: ${accessToken}`;
  } else {
    parms.signInUrl = authHelper.getAuthUrl();
    parms.debug = parms.signInUrl;
  }

  res.render('index', parms);
});


module.exports = router;