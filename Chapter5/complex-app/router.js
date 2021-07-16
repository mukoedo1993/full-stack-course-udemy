/*
How does this file, router.js work?
1: It executes set file.

...
It is just an example for splitting our codes in separate files and stay organized at the same time.

*/
const express = require('express')

const router = express.Router()

const userController = require('./controllers/userController')

router.get('/', userController.home)

router.post('/register', userController.register)

router.post('/login', userController.login)

module.exports = router// whatever what we set this equal to will be return when we require it.