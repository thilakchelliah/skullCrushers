var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer  = require('multer');
var mkdirp = require('mkdirp');
require('dotenv').config();
var temp=require('dotenv').config();
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


mongoose.connect("mongodb://emp_sai_test:thi2551250@ds135786.mlab.com:35786/smart_assis_emp", { useMongoClient: true }, function(err, db) {
  if (err) {
    return console.dir(err);
  }
});


var index = require('./routes/index');

var authorize = require('./routes/authorize');
var apiRouteOpen = require('./routes/openRoute');
// var apiRouteSecured = require('./routes/apiRoutesSecured');



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
app.use('/authorize', authorize);
app.use('/api', apiRouteOpen);
// app.use('/apiS', middleWare, apiRouteSecured);

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
app.use('/chartjs', express.static(__dirname + '/node_modules/chart.js/dist'));
app.use('/far', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free'));



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


