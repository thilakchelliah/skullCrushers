var express = require('express');
var router = express.Router();
require("../models/user");
require("../models/Tasks");
var mailController = require('../controller/mail.controller.js');
var taskController = require('../controller/task.controller.js');


router.get('/mail/list', mailController.list);
router.get('/mail/listPlain', mailController.listPlain);
router.post('/mail/toneAnalyse', mailController.toneAnalyse);
router.get('/mail/listMeetings', mailController.listMeetings);
router.post('/task/AddTask', taskController.AddTask);
router.post('/task/GetAllTask', taskController.GetAllTask);

module.exports = router;