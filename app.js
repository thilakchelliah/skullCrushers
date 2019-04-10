var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer  = require('multer');
var mkdirp = require('mkdirp');

global.config = require('./config');
var jwt = require('jsonwebtoken');
var localIp = process.env.IP != undefined ? process.env.IP : "localhost";
var localport = process.env.PORT != undefined ? process.env.PORT : 3000;
console.log(localIp);
console.log(localport);


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    var dest = 'public/uploads/';
    mkdirp(dest, function (err) {
        if (err) cb(err, dest);
        else cb(null, dest);
    });
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+'-'+file.originalname);
  }
});

global.multerUpload = multer({ storage: storage });


mongoose.connect("mongodb://thilaktest:test123@ds143070.mlab.com:43070/tech_registry_db", { useMongoClient: true }, function(err, db) {
  if (err) {
    return console.dir(err);
  }
});

require('dotenv').config();
var index = require('./routes/index');
<<<<<<< HEAD
var authorize = require('./routes/authorize');
var apiRouteOpen = require('./routes/apiRoutesOpen');
var apiRouteSecured = require('./routes/apiRoutesSecured');
=======
>>>>>>> 6744b6e29b191a7980cbc54c51e2687534255784
var middleWare = require('./middleware/JSWMiddleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'ClientCode')));

app.use('/', index);
<<<<<<< HEAD
app.use('/authorize', authorize);
app.use('/api', apiRouteOpen);
app.use('/apiS', middleWare, apiRouteSecured);
=======
//app.use('/api', apiRouteOpen);
>>>>>>> 6744b6e29b191a7980cbc54c51e2687534255784

app.use('/bootbox', express.static(__dirname + '/node_modules/bootbox'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist'));
app.use('/fontcss', express.static(__dirname + '/node_modules/font-awesome'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/ngstorage'));
app.use('/js', express.static(__dirname + '/node_modules/angular'));
app.use('/js', express.static(__dirname + '/node_modules/@uirouter/angularjs/release'));
app.use('/js', express.static(__dirname + '/node_modules/angular-jwt/dist'));
app.use('/summernote', express.static(__dirname + '/node_modules/summernote/dist'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(localport);


console.log('Server running at ' + localIp + ':' + localport);
module.exports = app;


