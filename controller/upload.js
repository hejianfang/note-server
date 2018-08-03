const {Router} = require("express");
const router = Router();
const mime = require('mime');
const multer = require('multer');
const accept = [
    mime.getType('jpg'),
    mime.getType('png'),
    mime.getType('gif'),
    mime.getType('webp')
];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        let extname = mime.getExtension(file.mimetype);
        cb(null, file.fieldname + '-' + Date.now() + '.' +extname)
    }
})

function fileFilter (req, file, cb) {
    let isAccept = false;
    accept.forEach(item => {
        if(item == file.mimetype){
            isAccept = true;
        }
    })
    if(isAccept){
        cb(null, true)
    }
    else {
        console.log(11);
        cb(new Error(`don't accept mimeType`))
    }
}
const upload = multer({
    storage,
    limits: {
        fileSize: 1024*1024*2
    },
    fileFilter,
    preservePath: true
})
const middleFun = upload.single('pic')

router.post('/upload',(req,res) => {
    middleFun(req, res, function (err) {
        if(err){
            console.log(22);
            res.json({
                code: 401,
                msg: '文件大小超出限制或上传文件类型不合法'
            })
            return
        }
        res.json({
            code: 200,
            data: {
                path: req.file.path.replace('uploads\\','/'),
            }
        })
    })

})

module.exports = router;