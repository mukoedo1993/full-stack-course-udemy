const express = require('express')

const session = require('express-session')

const MongoStore = require('connect-mongo')(session)

const flash = require('connect-flash')

const app = express()


//boilerplate code:
//course 65th update: modify this object so that it could save data in mongodb database.
let sessionOptions = session({
    secret: "Javascript is sooooooo cooooooool",
    store: new MongoStore({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 *60 *24 , httpOnly: true} // 1 day cookie to expire

})

app.use(sessionOptions)
app.use(flash()) //add the flash feature to our application: course 66th


const router = require('./router')
//require function:1: it executes this file. 2: it returns whatever that file exports.


console.log(router)


app.use(express.urlencoded({ extended: false}))
//It tells the express to add user submitted data onto our requested object. So we can access it via our request.

app.use(express.json())


app.use(express.static('public'))//We want to make the folder, public, accessible, for anyone who wants to view our app...


app.set('views', 'views')  //first argument needs to be exactly views, which is a express option.
                    // second argument happens to be views, which is the name of our folder.

app.set('view engine', 'ejs') // It tells our app which template engine we are using right now. (We now want to use the ejs engine...)



//app.get('/' , function(req, res){ // url, or route
   
//    res.render('home-guest') //We just give a name of the template...
//})
app.use('/', router) // It works in the same way as 3 lines of code before.

module.exports = app // instead of actually listening, we just export it from the file.