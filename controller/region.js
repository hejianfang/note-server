var express = require('express');
var router = express.Router();
var user = require("../database/model/user")
var isEmail = require( 'validator/lib/isEmail');

/* GET home page. */
router.post('/region', (req, res)=> {
    let {name,email,pwd} = req.body;
    user.findOne({email}).then(data=>{
        if(data){
            res.json({
                code:401,
                msg:"邮箱已存在",
            })
        }else {
            if(!isEmail(email)){
                res.json({
                    code:402,
                    msg:"请输入正确的邮箱",
                })
            }else{
                let avatar = "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3289761550,697278018&fm=27&gp=0.jpg"
                user.create({name,email,pwd,avatar}).then((data)=>{
                    req.session.users = data
                    res.json({
                        code:200,
                        msg:"注册成功",
                    })
                }).catch(data=>{
                    res.json({
                        code:400,
                        msg:"注册失败，重新注册",
                    })
                })
            }
        }
    })
});

module.exports = router;