var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    name: String,
    email:{
      type:String,
      unique:true
    },
    pwd:String,
    avatar: {
        type: String,
    }
},{versionKey: false, timestamps: {createAt: "createTime", updateAt: "updateTime"}});
module.exports = mongoose.model("user",user);