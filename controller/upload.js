const {Router} = require("express");
const router = Router();
const mime = require('mime');
const multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname,'../uploads'))
    },
    filename: function (req, file, cb) {
        console.log(file)
        let extname = mime.getExtension(file.mimetype)
        cb(null, file.fieldname + '-' + Date.now() +'.'+extname)
    }
})

var upload = multer({
    storage
})
router.post('/upload', upload.single('pic'),
    (req, res) => {
        let filePath = req.file.filename
        res.json({
            code:200,
            data: filePath
        })
    })

module.exports = router;