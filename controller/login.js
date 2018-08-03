var express = require('express');
var router = express.Router();
var user = require("../database/model/user")
var notes = require("../database/model/note")

router.post('/login',(req,res)=>{
    let {email,pwd} = req.body;
    console.log(pwd);
    user.findOne({email}).then(data=>{
        if(data){
           if(data.pwd == pwd){
               let {email,name,avatar} = data
               res.json({
                   data:{
                       email,
                       name,
                       avatar
                   },
                   code:200,
                   msg:'登录成功'
               })
           }else{
               let {email,name,avatar} = data
               res.json({
                   code:201,
                   data:{
                       email,name,avatar
                   },
               })
           }
        }else{
            res.json({
                code:401,
                msg:'用户不存在'
            })
        }
    })
})
router.get('/exitMsg',(req,res)=>{
    if(req.session.users){
         req.session.users = null
        res.json({
            code:200,
            msg:"退出登录"
        })
    }else{
        res.json({
            code:403,
            msg:'重新退出'
        })
    }
})
router.post('/userchange',(req,res)=>{
    let {name,email,pwd,avatar} = req.body
    req.session.users = null
    user.update({email},{$set:{name,pwd,avatar}}).then(data=>{
        notes.update({name},{$set:{pic:avatar}}).then(data=>{
        })
      })
    user.find({email}).then(data=>{
        res.json({
            data,
            code:200
        })
    })
})


module.exports = router;