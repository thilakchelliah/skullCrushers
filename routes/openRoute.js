var express = require('express');
var router = express.Router();
require("../models/user");
require("../models/Task");
var mailController = require('../controller/mail.controller.js');


router.get('/mail/list', mailController.list);
router.get('/mail/listPlain', mailController.listPlain);
router.post('/mail/toneAnalyse', mailController.toneAnalyse);
router.get('/mail/listMeetings', mailController.listMeetings);
router.post('/task/AddTask', mailController.AddTask);
router.get('/task/GetAllTask', mailController.GetAllTask);

module.exports = router;