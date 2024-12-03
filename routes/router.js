const express = require('express')
const userController = require('../controllers/userController')


const router = new express.Router()
// register router -post
router.post('/register',userController.registerController)
//login router -post
router.post('/login',userController.loginController)

module.exports = router
