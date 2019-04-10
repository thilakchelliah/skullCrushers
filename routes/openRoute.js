var express = require('express');
var router = express.Router();

var mailController = require('../controller/mail.controller.js');


router.get('/mail/list', mailController.list);
module.exports = router;