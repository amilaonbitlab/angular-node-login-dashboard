// app/routes.js

// model create
var User = require('./models/user');
var TableUser = require('./models/tableUser');

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
                    res.json(200,{message: 'success'});
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
    app.get('/api/getDashboardData', function(req, res) {

        // table user model 
       res.json(200,{message: 'OK'});
       
    });
  
    // -- Get Table Data Total Count API
    app.get('/api/getTableDataTotalCount', function(req, res) {

        // find user by email address 
        TableUser.find({},function(err, foundUser) {           
            res.json(200,{total: foundUser.length });           
        });               
    });

    // -- Get Selected Page Table Data API
    app.get('/api/getSelectPageTableData', function(req, res) {

        var startIndex  = req.query.startIndex;
        var endIndex    = req.query.endIndex;
        var tempArray   = [];        
        // find user by email address 
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