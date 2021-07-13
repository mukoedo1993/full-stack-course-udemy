const express = require('express')

const app = express()


app.use(express.static('public'))//We want to make the folder, public, accessible, for anyone who wants to view our app...


app.set('views', 'views')  //first argument needs to be exactly views, which is a express option.
                    // second argument happens to be views, which is the name of our folder.

app.set('view engine', 'ejs') // It tells our app which template engine we are using right now. (We now want to use the ejs engine...)

app.get('/' , function(req, res){ // url, or route
   
    res.render('home-guest') //We just give a name of the template...
})


app.listen(3000)