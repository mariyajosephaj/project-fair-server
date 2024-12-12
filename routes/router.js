const express = require('express')
const userController = require('../controllers/userController')
const projectController = require('../controllers/projectController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multerMiddleware = require('../middleware/multerMiddleware')

const router = new express.Router()
// register router -post
router.post('/register',userController.registerController)
//login router -post
router.post('/login',userController.loginController)
 
// add projet- post
router.post('/add-project',jwtMiddleware,multerMiddleware.single('projectImage'),projectController.addProjectController)


// home projet- get
router.get('/home-projects',projectController.getHomeProjectsController)


// add projet- get
router.get('/user-projects',jwtMiddleware,projectController.getUserProjectsController)


//  add projet- get
router.get('/all-projects',jwtMiddleware,projectController.getAllProjectsController)


//  edit projet- put
router.put('/projects/:id/edit',jwtMiddleware,multerMiddleware.single('projectImage'),projectController.editProjectController)


// remove project - delete
router.delete('/projects/:id/remove',jwtMiddleware,projectController.removeProjectController)

// edit user-put

router.put('/user/edit',jwtMiddleware,multerMiddleware.single('profilePic'),userController.editUserController)



module.exports = router
