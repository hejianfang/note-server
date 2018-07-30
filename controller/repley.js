var express = require('express');
var router = express.Router();
var repley = require("../database/model/repley")
var notes = require("../database/model/note")

router.post('/get/allrepley',(req,res)=>{
    let {id,name,userId,conent} = req.body
    notes.findOneAndUpdate({_id:id},{$inc:{repley:1}}).then(data=>{
        repley.create({id,name,userId,conent}).then(data=>{
            console.log(data);
            res.json({
                code:200,
                msg:'评论成功'
            })
        })
    })

})
router.get('/get/detilsrepley',(req,res)=>{
    let {id} = req.query
    console.log(id);
    repley.find({id}).then(data=>{
        res.json({
            code:200,
            data,
            msg:'评论内容'
        })
    }).catch(err => console.log(err))
})
module.exports = router;