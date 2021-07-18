/*
How does this file, router.js work?
1: It executes set file.

...
It is just an example for splitting our codes in separate files and stay organized at the same time.

*/



const express = require('express')

const router = express.Router()

const userController = require('./controllers/userController')

const postController = require('./controllers/postController')

//user related routes
router.get('/', userController.home)

router.post('/register', userController.register)

router.post('/login', userController.login)

router.post('/logout', userController.logout)

// post related routes
router.get('/create-post', userController.mustBeLoggedIn ,postController.viewCreateScreen) // But we want to make sure that we could only visit this post if we are logged in.
//Second argument: If you haven't logged in at all, you should be redirected to the homepage. If there is a user object on the session, we must run the next function for that router.

module.exports = router// whatever what we set this equal to will be return when we require it.