//goal: export multiple functions that could be executed in multiple javascript files.

const { reset } = require('nodemon')
const User = require('../models/User') // reusable blueprint or ctor. functions.

exports.mustBeLoggedIn = function(req, res, next) {
 if(req.session.user) {
    next() //The user exists, so we could call the next function.
 } else {
    req.flash("errors", "You must be logged in to perform that action")
    req.session.save(function(){
        res.redirect('/')
    })
 }
}


exports.login = function(req, res){ 
    let user = new User(req.body)
    user.login().then(function(result){
        
        req.session.user = {avatar: user.avatar, //in the memory, we know it will be avatar in our object. We save it in a session, so if our user login, we not need to type in
            //the avatar again.

             username: user.data.username}
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

    user.register().then(() => {
        req.session.user = {username: user.data.username,
        avatar: user.avatar, // course 69th
        _id: user.data._id
    }
        // After we update the session data:
        req.session.save(function() {
            res.redirect('/')
        })

        //regErrors as parameters: our controller doesn't have to be aware of our data structure. It's only
        //calling the promise and letting the model deal with all of the data and the varible names, so on and so forth.
    }).catch((regErrors) => {
        regErrors.forEach(function(error){
            req.flash('regErrors', error) // This step will trigger a request on database.
        })
        req.session.save(function() {
            res.redirect('/')
        })
        // We don't actually want to redirect until our database actions has completed.
        // So, let's manually tell our database to save.


    })
     // It is an asynchronous function, and we can wait our return our promise. We want to adjust our register function so that it can return a promise.
                    //...and we can wait for our promise, here in our controller....


    console.log(user) // FOR TEST ONLY

 
}

// 
exports.home = function(req, res){
    if (req.session.user) {
        res.render('home-dashboard'
       //, {username: req.session.user.username, avatar: req.session.user.avatar}   // we have already passed it in app.js. Commented in course 71st
                                      ) // we want to pass the second argument as JS object to the first argument.

    } else {
        res.render('home-guest'
        , {errors: req.flash('errors'), regErrors: req.flash('regErrors')}
       )//HTTP request is stateless, it has no memory that we login just failed.
        //We want to only show the error message to the user once. Once we have shown the user the data, we want to delete it. (course 66th)
    }
} 

//res.render('home-guest')