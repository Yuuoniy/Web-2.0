var express = require('express');
var router = express.Router();
var controller = require('../controller/index')
/* GET home page. */
router.get('/signin', controller.toSigninPage)
router.post('/signin',controller.signIn)
router.get('/regist',controller.toSignupPage)
router.post('/regist',controller.signUp)
router.get('/signout',controller.signOut)
router.get('/detail',controller.toDetail)
router.all('*',controller.root)
module.exports = router;
