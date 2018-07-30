var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var repley = new Schema({
     id: String,
    name:String,
    userId:String,
    conent:String
},{versionKey: false, timestamps: {createAt: "createTime", updateAt: "updateTime"}});

module.exports = mongoose.model("repley",repley);