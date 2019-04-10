var express = require('express');
var router = express.Router();

var mailController = require('../controller/mail.controller.js');


router.get('/mail/list', mailController.list);
router.get('/mail/listPlain', mailController.listPlain);
router.post('/mail/toneAnalyse', mailController.toneAnalyse);
module.exports = router;