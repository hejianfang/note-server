var express = require('express');
var router = express.Router();
var user = require("../database/model/user")

router.post('/login',(req,res)=>{
    let {email,pwd} = req.body;
    user.findOne({email}).then(data=>{
        if(data){
           if(data.pwd == pwd){
               req.session.users = data;
               let {email,name} = data
               res.json({
                   data:{
                       email,
                       name
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
        let {email,name} = req.session.users
        res.json({
            data:{
                email,
                name
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


module.exports = router;