//goal: export multiple functions that could be executed in multiple javascript files.

const { reset } = require('nodemon')
const User = require('../models/User') // reusable blueprint or ctor. functions.

exports.login = function(req, res){ 
    let user = new User(req.body)
    user.login( function(result) {
        //We are passing this function as an argument into login. And, when we are defining the login function, we are waiting for the 
        // perfect moment to call this function. In other words, we know that this function is not going to run until an appropriate moment once the database
        // action has the chance to complete. 
        res.send(result) // when the model call it <--callback function


    }) // It's the model, not the controller that deal with all our business object and manage our data.
    // However, we don't know how long the login method is going to take. Because it depends on database, it might take 5000 ms or 2000s, we just don;t
    // know...
    // traditional approach in course 57th: callback function:

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