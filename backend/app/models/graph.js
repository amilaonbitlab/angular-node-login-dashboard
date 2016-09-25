// graph model js 

var mongoose = require('mongoose');

module.exports = mongoose.model('graph', {
    seris : {type : String},    
    dataArray : {type : Array}
});
