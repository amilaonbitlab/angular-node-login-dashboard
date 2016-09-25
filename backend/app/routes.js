// app/routes.js

// model create
var User = require('./models/user');
var TableUser = require('./models/tableUser');
var Graph = require('./models/graph');

var Secret  = require('../config/secret');
var jwt     = require('jsonwebtoken');

module.exports = function(app) {

    // -------------------------------------------
    // -------- Start User API  ------------------
    // -------------------------------------------
    // -- Auth User API
    app.post('/api/checkUser', function(req, res) {
        // config 
        var email = req.body.email;                
        var userfindQuray = {
            "email" : email
        }
        // find user by email address 
        User.find(userfindQuray,function(err, foundUser) {                                
            // if not found User            
            if(foundUser.length == 0){
                res.json(200,{message : 'OK'})
            }else{
                res.json(200,{message: 'NO'});
            }            
        }); 
    });

    // -- New User API
    app.post('/api/newUser', function(req, res) {

        // config 
        var email = req.body.email;   
        var password =  req.body.password;            
        // create new user 
        var userOne = new User();
        userOne.email = email;
        userOne.password =  password;  
        userOne.save();
        // call back sucsses 
        res.json(200,{message : 'OK'});      
    });

    // -- Auth User API
    app.post('/api/authUser', function(req, res) {

        // config 
        var email = req.body.email;
        var password =  req.body.password;            
        var userfindQuary = {
            "email" : email
        }
        // find user by email address
        User.find(userfindQuary,function(err, foundUser) {   
            // if found user                             
            if(foundUser.length == 1){
                // check password
                if(foundUser[0].password == password){

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(foundUser[0], Secret.secret);            
                    res.json(200,{message: 'success',token :  token });
                }else{
                    res.json(200,{message: 'faild'});
                }    
            }else{
                res.json(200,{message: 'faild'});
            }
            
        }); 
    });

    // -------------------------------------------
    // -------- Start Dashboard API  -------------
    // -------------------------------------------    
     // -- Get Dashboard Data API
    app.get('/auth/api/getDashboardData', function(req, res) {

        // find graph collection 
        Graph.find({},function(err, foundGraph) {                
            res.json(200,foundGraph);           
        });    
       
    });
  
    // -- Get Table Data Total Count API
    app.get('/auth/api/getTableDataTotalCount', function(req, res) {

        // find table user  
        TableUser.find({},function(err, foundUser) {                
            res.json(200,{total: foundUser.length });           
        });               
    });

    // -- Get Selected Page Table Data API
    app.get('/auth/api/getSelectPageTableData', function(req, res) {

        var startIndex  = req.query.startIndex;
        var endIndex    = req.query.endIndex;
        var tempArray   = [];        
        // find table user 
        TableUser.find({},function(err, foundUser) {        
            for(var i = startIndex,k = 0; i <= endIndex; i++,k++ ){
                tempArray[k] = foundUser[i];
            }            
            res.json(200,tempArray);           
        });               
    });



    // -------------------------------------------
    // -------- Start loading index.html  --------
    // -------------------------------------------    
    // loading index html 
    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); 
    });
};