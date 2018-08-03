var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var swiper = new Schema({
    title:  String,
    pic: String,
    content: String,
},{versionKey: false, timestamps: {createAt: "createTime", updateAt: "updateTime"}});

module.exports = mongoose.model("swiper",swiper,"swiper");