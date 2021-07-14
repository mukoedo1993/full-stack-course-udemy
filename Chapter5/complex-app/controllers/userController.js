//goal: export multiple functions that could be executed in multiple javascript files.

const { reset } = require('nodemon')
const User = require('../models/User') // reusable blueprint or ctor. functions.

exports.login = function(){

}


exports.logout = function(){
    
}

exports.register = function(req , res){

    let user = new User(req.body)
    console.log(user) // FOR TEST ONLY
    user.register()


    if (user.errors.length) {
       res.send(user.errors)

    } else {
        res.send("Congrats! There are no errors...")
    }
}


exports.home = function(req, res){
    res.render('home-guest')
} 