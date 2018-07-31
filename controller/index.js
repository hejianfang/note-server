const {Router} = require("express");
const router = Router();
const slideshow = require('./slideshow')
const region = require('./region')
const login = require('./login')
const notes = require('./notes')
const repley = require('./repley')
const upload = require('./upload')


router.use(slideshow);
router.use(region);
router.use(login);
router.use(notes);
router.use(repley);
router.use(upload);


module.exports = router;