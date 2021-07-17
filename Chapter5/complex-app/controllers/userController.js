//goal: export multiple functions that could be executed in multiple javascript files.

const { reset } = require('nodemon')
const User = require('../models/User') // reusable blueprint or ctor. functions.

exports.login = function(req, res){ 
    let user = new User(req.body)
    user.login().then(function(result){
        
        req.session.user = {favColor: "blue", username: user.data.username}
        //res.send(result) // Here, we want to let users to login. In other words, we want to leverage session here.


        /*
However, we do need to worry about the timing of our event.
When we say request.session.user, the session package is going to recognize that we are changing the session data and in response is going to automatically update that session data in database. It's great.
But, updating database is an asynchronous action. It might a while to complete. We don't want to just run redirect right here because there's no guarantee that the database
will have actually been updated in time before the redirect runs.
        */
        req.session.save(function() { //we could manually tell it to save....
            res.redirect('/')
        })


    }).catch(function(e){

        req.flash('errors', e) //first argument: the name of collection or an array of messages we want to start building or adding on to;
        //second argument: the actual message you want to add on to the set of messages. Here, we set this as the value that our promise are going to use to reject with.
        //It is not guaranteed that flash function will complete before the redirect function.

        // Commented out in course 66th
       // res.redirect('/') // It is going to be treated as a new separated request. Since we are redirecting to the homepage, our router is going to call our home function.
       req.session.save( function(){
           res.redirect('/')
       })
    }) 

}


exports.logout = function(req, res){
    req.session.destroy(function(){
        res.redirect('/')   //redirect them to the homepage
    }) 
    //So, if the current incoming request from a browser has a cookie with a valid or matching session ID, 
    //this is going to find that in our database and destroy that session.


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

// 
exports.home = function(req, res){
    if (req.session.user) {
        res.render('home-dashboard', {username: req.session.user.username}) // we want to pass the second argument as JS object to the first argument.

    } else {
        res.render('home-guest', {errors: req.flash('errors')})//HTTP request is stateless, it has no memory that we login just failed.
        //We want to only show the error message to the user once. Once we have shown the user the data, we want to delete it. (course 66th)
    }
} 

//res.render('home-guest')