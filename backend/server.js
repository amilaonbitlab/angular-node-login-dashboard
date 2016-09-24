// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose 	   = require('mongoose');

// configuration ===========================================
    
// config files
var db = require('./config/db');

// set our port as 8081
var port = process.env.PORT || 8081; 

// connect to our mongoDB database 
mongoose.connect(db.url); 


// Allow Cross Domain
allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if ('OPTIONS' === req.method) {  	
    res.send(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// routes ==================================================
require('./app/routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8081
app.listen(port);               

// shoutout to the user                     
console.log('Angular Node Login Dashboard Backend Port : ' + port);

// expose app           
exports = module.exports = app;  

// Start DB update 

// grab the Ticker model we just created
var User = require('./app/models/user');

// When restart sever remove all User Collection
User.find({}).remove().exec();

var userOne = new User();
userOne.email = 'abc@gmail.com';
userOne.password =  '123';

userOne.save();