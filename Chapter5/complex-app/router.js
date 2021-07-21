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


//profile related routes
router.get('/profile/:username', userController.ifUserExists, userController.profilePostsScreen)



// post related routes
router.get('/create-post', userController.mustBeLoggedIn ,postController.viewCreateScreen) // But we want to make sure that we could only visit this post if we are logged in.
//Second argument: If you haven't logged in at all, you should be redirected to the homepage. If there is a user object on the session, we must run the next function for that router.

router.post('/create-post', userController.mustBeLoggedIn, postController.create)

router.get('/post/:id', postController.viewSingle) //Our name part is now flexible. This will represent what user includes after the post slash column...
// blogging pattern: By default, any post you create is viewable for the public.

module.exports = router// whatever what we set this equal to will be return when we require it.