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

// grab the User model we just created
var User = require('./app/models/user');

// When restart sever remove all User Collection
User.find({}).remove().exec();

var userOne = new User();
userOne.email = 'abc@gmail.com';
userOne.password =  '123';

userOne.save();


// table user model 
var TableUser = require('./app/models/tableUser');

// When restart sever remove all teble user Collection
TableUser.find({}).remove().exec();

// dummy data 
var dummyTableData = [{"id":1,"first_name":"Jonathan","last_name":"Bailey","email":"jbailey0@dell.com","gender":"Male","ip_address":"95.193.77.153"},
{"id":2,"first_name":"Roger","last_name":"Hamilton","email":"rhamilton1@disqus.com","gender":"Male","ip_address":"119.226.41.218"},
{"id":3,"first_name":"Anthony","last_name":"Peters","email":"apeters2@harvard.edu","gender":"Male","ip_address":"37.173.118.30"},
{"id":4,"first_name":"Joshua","last_name":"Robertson","email":"jrobertson3@jimdo.com","gender":"Male","ip_address":"2.176.165.222"},
{"id":5,"first_name":"Diane","last_name":"Turner","email":"dturner4@t.co","gender":"Female","ip_address":"113.156.18.86"},
{"id":6,"first_name":"Alice","last_name":"Hernandez","email":"ahernandez5@networksolutions.com","gender":"Female","ip_address":"83.40.81.210"},
{"id":7,"first_name":"Edward","last_name":"Sims","email":"esims6@php.net","gender":"Male","ip_address":"188.115.14.249"},
{"id":8,"first_name":"Theresa","last_name":"Spencer","email":"tspencer7@hud.gov","gender":"Female","ip_address":"153.79.6.22"},
{"id":9,"first_name":"Amy","last_name":"Chapman","email":"achapman8@homestead.com","gender":"Female","ip_address":"158.90.84.210"},
{"id":10,"first_name":"Helen","last_name":"Andrews","email":"handrews9@gov.uk","gender":"Female","ip_address":"48.57.121.203"},
{"id":11,"first_name":"Jacqueline","last_name":"Diaz","email":"jdiaza@ihg.com","gender":"Female","ip_address":"136.246.84.230"},
{"id":12,"first_name":"Anna","last_name":"Fernandez","email":"afernandezb@dedecms.com","gender":"Female","ip_address":"69.89.16.125"},
{"id":13,"first_name":"Christine","last_name":"Stewart","email":"cstewartc@elegantthemes.com","gender":"Female","ip_address":"12.130.247.196"},
{"id":14,"first_name":"Louise","last_name":"Watkins","email":"lwatkinsd@eepurl.com","gender":"Female","ip_address":"214.75.47.118"},
{"id":15,"first_name":"Wayne","last_name":"Holmes","email":"wholmese@nhs.uk","gender":"Male","ip_address":"139.86.77.141"},
{"id":16,"first_name":"Helen","last_name":"Mitchell","email":"hmitchellf@biglobe.ne.jp","gender":"Female","ip_address":"48.211.127.244"},
{"id":17,"first_name":"Ashley","last_name":"Thompson","email":"athompsong@ocn.ne.jp","gender":"Female","ip_address":"96.167.186.89"},
{"id":18,"first_name":"Diana","last_name":"Butler","email":"dbutlerh@odnoklassniki.ru","gender":"Female","ip_address":"21.83.70.137"},
{"id":19,"first_name":"Barbara","last_name":"Murray","email":"bmurrayi@clickbank.net","gender":"Female","ip_address":"203.102.242.179"},
{"id":20,"first_name":"John","last_name":"Marshall","email":"jmarshallj@aboutads.info","gender":"Male","ip_address":"240.32.229.237"},
{"id":21,"first_name":"Craig","last_name":"Schmidt","email":"cschmidtk@biglobe.ne.jp","gender":"Male","ip_address":"169.169.63.142"},
{"id":22,"first_name":"Nicole","last_name":"Garrett","email":"ngarrettl@4shared.com","gender":"Female","ip_address":"81.181.75.96"},
{"id":23,"first_name":"Craig","last_name":"Washington","email":"cwashingtonm@europa.eu","gender":"Male","ip_address":"61.173.235.25"},
{"id":24,"first_name":"Paul","last_name":"Bishop","email":"pbishopn@oaic.gov.au","gender":"Male","ip_address":"46.133.233.169"},
{"id":25,"first_name":"Carol","last_name":"Day","email":"cdayo@rambler.ru","gender":"Female","ip_address":"0.164.218.105"},
{"id":26,"first_name":"Alan","last_name":"Grant","email":"agrantp@china.com.cn","gender":"Male","ip_address":"153.208.207.116"},
{"id":27,"first_name":"Deborah","last_name":"Hunter","email":"dhunterq@blog.com","gender":"Female","ip_address":"43.211.31.7"},
{"id":28,"first_name":"Jacqueline","last_name":"Fowler","email":"jfowlerr@netlog.com","gender":"Female","ip_address":"106.222.24.110"},
{"id":29,"first_name":"Ashley","last_name":"Hernandez","email":"ahernandezs@linkedin.com","gender":"Female","ip_address":"236.216.175.101"},
{"id":30,"first_name":"Louise","last_name":"Roberts","email":"lrobertst@1688.com","gender":"Female","ip_address":"122.248.162.167"},
{"id":31,"first_name":"Theresa","last_name":"Griffin","email":"tgriffinu@dropbox.com","gender":"Female","ip_address":"37.221.76.65"},
{"id":32,"first_name":"Brandon","last_name":"Gonzales","email":"bgonzalesv@youku.com","gender":"Male","ip_address":"212.230.193.136"},
{"id":33,"first_name":"Aaron","last_name":"Willis","email":"awillisw@geocities.com","gender":"Male","ip_address":"244.98.234.160"},
{"id":34,"first_name":"Harry","last_name":"Wilson","email":"hwilsonx@tripod.com","gender":"Male","ip_address":"42.207.106.78"},
{"id":35,"first_name":"Annie","last_name":"Gilbert","email":"agilberty@flavors.me","gender":"Female","ip_address":"182.88.147.179"},
{"id":36,"first_name":"Margaret","last_name":"Reynolds","email":"mreynoldsz@unc.edu","gender":"Female","ip_address":"234.86.154.173"},
{"id":37,"first_name":"Christopher","last_name":"Sullivan","email":"csullivan10@nationalgeographic.com","gender":"Male","ip_address":"174.208.42.212"},
{"id":38,"first_name":"Patrick","last_name":"Carroll","email":"pcarroll11@hp.com","gender":"Male","ip_address":"234.47.145.3"},
{"id":39,"first_name":"George","last_name":"Ford","email":"gford12@clickbank.net","gender":"Male","ip_address":"240.217.58.185"},
{"id":40,"first_name":"Raymond","last_name":"Stevens","email":"rstevens13@google.it","gender":"Male","ip_address":"135.32.203.64"},
{"id":41,"first_name":"Rebecca","last_name":"Elliott","email":"relliott14@cargocollective.com","gender":"Female","ip_address":"165.131.197.78"},
{"id":42,"first_name":"Andrea","last_name":"Harper","email":"aharper15@umn.edu","gender":"Female","ip_address":"169.29.137.206"},
{"id":43,"first_name":"Virginia","last_name":"Miller","email":"vmiller16@flickr.com","gender":"Female","ip_address":"92.249.144.0"},
{"id":44,"first_name":"Fred","last_name":"Stevens","email":"fstevens17@nationalgeographic.com","gender":"Male","ip_address":"174.229.108.250"},
{"id":45,"first_name":"Edward","last_name":"Stewart","email":"estewart18@ocn.ne.jp","gender":"Male","ip_address":"153.167.18.69"},
{"id":46,"first_name":"Phyllis","last_name":"Lynch","email":"plynch19@omniture.com","gender":"Female","ip_address":"245.54.71.99"},
{"id":47,"first_name":"Shawn","last_name":"Jackson","email":"sjackson1a@ucoz.ru","gender":"Male","ip_address":"204.152.246.217"}];

// save dummy data 
for(var i = 0; i < dummyTableData.length; i++){

	var TableUserTemp = new TableUser();
	TableUserTemp.email = dummyTableData[i].email;
	TableUserTemp.first_name = dummyTableData[i].first_name;
	TableUserTemp.gender = dummyTableData[i].gender;
	TableUserTemp.save();

}