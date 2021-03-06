var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var note = new Schema({
     pic:String,
    name: String,
    id:String,
    title:String,
    conent:String,
    conents:String,
    browse:Number,
    repley:Number,
    classify:String,
    update: Date,
},
    {versionKey: false, timestamps: {createAt: "createTime", updateAt: "updateTime"}});

module.exports = mongoose.model("note",note);