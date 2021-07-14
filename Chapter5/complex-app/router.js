/*
How does this file, router.js work?
1: It executes set file.

...
It is just an example for splitting our codes in separate files and stay organized at the same time.

*/
const express = require('express')

const router = express.Router()

router.get('/', function(req, res) {
 res.render('home-guest')
})

module.exports = router// whatever what we set this equal to will be return when we require it.