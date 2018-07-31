var express = require('express');
var router = express.Router();
var user = require("../database/model/user")
var notes = require("../database/model/note")

router.post('/login',(req,res)=>{
    let {email,pwd} = req.body;
    user.findOne({email}).then(data=>{
        if(data){
           if(data.pwd == pwd){
               req.session.users = data;
               console.log(req.session.users);
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
               res.json({
                   code:400,
                   msg:'密码不对'
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
router.get('/getMsg',(req,res)=>{
    if(req.session.users){
        let {email,name,avatar} = req.session.users
        res.json({
            data:{
                email,
                name,
                avatar
            },
            code:200,
            msg:"用户已登录"
        })
    }else{
        res.json({
            code:401,
            msg:'未登录'
        })
    }

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
    console.log(avatar);
    user.findOneAndUpdate({email},{$set:{name,pwd,avatar}}).then(data=>{
        req.session.users = data
        notes.update({name},{$set:{pic:avatar}}).then(data=>{
        })
          console.log(data);
          res.json({
              data,
              code:200
          })
      })
})


module.exports = router;