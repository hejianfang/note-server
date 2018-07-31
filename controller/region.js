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
                // let avatar = 'https://www.baidu.com/s?wd=%E8%81%94%E7%B3%BB%E4%BA%BA%E5%A4%B4%E5%83%8F&usm=1&ie=utf-8&rsv_cq=%E6%B8%B8%E5%AE%A2%E5%A4%B4%E5%83%8F%E5%9B%BE%E7%89%87%E5%A4%A7%E5%85%A8&rsv_dl=0_right_recommends_merge_21028&cq=%E6%B8%B8%E5%AE%A2%E5%A4%B4%E5%83%8F&srcid=20910&rt=%E5%85%B6%E4%BB%96%E4%BA%BA%E8%BF%98%E6%90%9C&recid=21028&euri=f6a4b148948a47c995843766cc548929'
                user.create({name,email,pwd}).then((data)=>{
                    req.session.users = data;
                    res.json({
                        data:{
                          name,email
                        },
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