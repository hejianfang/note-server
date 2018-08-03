var express = require('express');
var router = express.Router();
var swiper = require("../database/model/swiper")

/* GET home page. */
router.get('/swipers', function(req, res) {
    swiper.find({}).then((data)=>{
        res.json({
            code:200,
            data
        })
    })
});
router.post('/swipers', function(req, res) {
    let{title,pic,content} = req.body
    swiper.create({title,pic,content}).then((data)=>{
        res.json({
            code:200,
            data
        })
    })
});

module.exports = router;