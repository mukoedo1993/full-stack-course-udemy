//goal: export multiple functions that could be executed in multiple javascript files.

const { reset } = require('nodemon')
const User = require('../models/User') // reusable blueprint or ctor. functions.

exports.login = function(req, res){ 
    let user = new User(req.body)
    user.login().then(function(result){
        
        req.session.user = {favColor: "blue", username: user.data.username}
        res.send(result) // Here, we want to let users to login. In other words, we want to leverage session here.
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
    if (req.session.user) {
        res.send("Welcome to the actual application!") // 

    } else {
        res.render('home-guest')//
    }
} 

//res.render('home-guest')