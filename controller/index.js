const {Router} = require("express");
const router = Router();
const slideshow = require('./slideshow')
const region = require('./region')
const login = require('./login')
const notes = require('./notes')
const repley = require('./repley')
const upload = require('./upload')
var path = require('path');
router.use(slideshow);
router.use(region);
router.use(login);
router.use(notes);
router.use(repley);
router.use(upload);


/* GET home page. */
router.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../pages/index.html"))
});


module.exports = router;