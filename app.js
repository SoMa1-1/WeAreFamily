var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var routes = require('./routes/index');
var users = require('./routes/users');
var pairing = require('./routes/pairing');
var tv = require('./routes/tv');
var home = require('./routes/home');
var gps = require('./routes/gps');
var lock = require('./routes/lock');
var push = require('./routes/push');
var push_condition = require('./routes/push_condition');
var lifestyle = require('./routes/lifestyle');

var mornitor = require('./mornitor');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', routes);
app.use('/users', users);
app.use('/pairing', pairing);
app.use('/tv', tv);
app.use('/home', home);
app.use('/gps', gps);
app.use('/lock', lock);
app.use('/push', push);
app.use('/push_condition', push_condition);
app.use('/lifestyle', lifestyle);

mornitor.mornitoring();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// post from android
// app.post('/',function(req,res){
//   res.send('latitude: ' + req.query['latitude']);
// });

// app.post('/',function(req,res){
//   res.send('longitude: ' + req.query['longitude']);
// });

// app.post('/',function(req,res){
//   res.send('altitude: ' + req.query['altitude']);
// });


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
