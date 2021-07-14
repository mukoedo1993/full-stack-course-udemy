//goal: export multiple functions that could be executed in multiple javascript files.

const User = require('../models/User') // reusable blueprint or ctor. functions.

exports.login = function(){

}


exports.logout = function(){
    
}

exports.register = function(req , res){

    let user = new User(req.body)
    console.log(user) // FOR TEST ONLY
    user.register()

    res.send("Thanks for trying to register.")
}


exports.home = function(req, res){
    res.render('home-guest')
} 