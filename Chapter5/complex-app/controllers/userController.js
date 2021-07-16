//goal: export multiple functions that could be executed in multiple javascript files.

const { reset } = require('nodemon')
const User = require('../models/User') // reusable blueprint or ctor. functions.

exports.login = function(req, res){ 
    let user = new User(req.body)
    user.login().then(function(result){
        res.send(result)
    }).catch(function(e){
        res.send(e)
    }) 

}


exports.logout = function(){
    
}

exports.register = function(req , res){

    let user = new User(req.body)

    user.register()
    console.log(user) // FOR TEST ONLY

    if (user.errors.length) {
       res.send(user.errors)

    } else {
        res.send("Congrats! There are no errors...")
    }
}


exports.home = function(req, res){
    res.render('home-guest')
} 