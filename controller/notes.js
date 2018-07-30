var express = require('express');
var router = express.Router();
var notes = require("../database/model/note")


router.get('/get/allnoteList',(req,res)=>{
    notes.find({}).limit(5).then(data=>{
        res.json({
            data,
            code:200,
        })
    })
});
router.post('/add/noteList',(req,res)=>{
    let {title,conent,classify} = req.body
    let browse =  0
    let repley =  0
    let update = new Date().toUTCString()
    let {name,_id} = req.session.users
    notes.create({name,id:_id,title,conent,classify,browse,repley,update,repleys}).then(data=>{
        res.json({
                  data,
                  code:200,
              })
    })
});
router.get('/noteList/one',(req,res)=>{
    let _id = req.query._id
    notes.findOne({_id}).then(data=>{
        let browse = data.browse+=1
        notes.update({_id},{$set:{browse}}).then(data=>{
        })
        res.json({
            code:200,
            data
        })
    })
});
router.get('/noteList/title',(req,res)=>{
    let title = req.query.title
    console.log(title);
    let reg = new RegExp(`${title}`)
    notes.find({title:reg}).then(data=>{
          if(!(data == [])){
              res.json({
                  code:200,
                  msg:"获取成功",
                  data
              })
          }else{
              res.json({
                  code:400,
                  msg:'没有找到相应的文章'
              })
          }
    })
});
module.exports = router;