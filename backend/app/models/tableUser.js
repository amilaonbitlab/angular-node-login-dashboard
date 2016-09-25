// table User model js 

var mongoose = require('mongoose');

module.exports = mongoose.model('tableUser', {
    email : {type : String},    
    first_name : {type : String},
    gender : {type : String}
});
