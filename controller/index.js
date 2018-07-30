const {Router} = require("express");
const router = Router();
const slideshow = require('./slideshow')
const region = require('./region')
const login = require('./login')
const notes = require('./notes')
const repley = require('./repley')


router.use(slideshow);
router.use(region);
router.use(login);
router.use(notes);
router.use(repley);


module.exports = router;