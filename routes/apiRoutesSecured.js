var express = require('express');
var router = express.Router();
require("../models/BlogPost");
require("../models/tutorial");
var userController = require('../controller/user.controller.js');
var blogController = require('../controller/blog.controller.js');
var tutorialController = require('../controller/tutorial.controller.js');

router.get('/validateUser', function(req, res) {
    res.send('hello world');
});
router.get('/User/FetchAll', userController.GetUserData);

//Blog manager

router.post('/Blog/Create', blogController.AddBlogPost);
router.post('/Blog/Update', blogController.UpdateBlogPost);
router.post('/Blog/Delete', blogController.DeleteBlogPost);
router.get('/Blog/FetchAll', blogController.GetAllBlogPost);


//Tutorial Manager
router.post('/Tutorial/Create', tutorialController.AddTutorial);
router.get('/Tutorial/FetchAll', tutorialController.GetAllTutorial);
router.post('/Tutorial/FileUpload', global.multerUpload.any(), tutorialController.uploadTutorialFile);
router.post('/Tutorial/Delete', tutorialController.DeleteTutorialPost);


module.exports = router;
