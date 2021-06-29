// Course 19th and 20th"
    // methods are two requests. get request and post request.
    // If you manually type in url or click some links, there is a get request.

    //However, if I type into the textbox and send some information, there is a post request.


let express = require("express")
let ourApp = express()

//!!!!
//Just use it.
ourApp.use(express.urlencoded({extended: false})) // Enabling the feature it expresses so that users' input is easily accessible from
//the required body object.


// We tell the server what to do if it gets a get request:
ourApp.get('/' , function(req, res) {

   //Use post method, to send to form to the url of localhost:3000/answer
    res.send(`
    <form action="/answer" method="POST">
        <p>What color is the sky on a clear and sunny day?</p>
        <input name="skyColor" autocomplete="off">
        <button>Submit Answer</button>
    </form>
    `)
}) 

ourApp.post('/answer', function(req, res) {
   if (req.body.skyColor.toUpperCase() == "BLUE") { //for the input name part above
    res.send(`
    <p>Congrat, that is the correct answer!</p>
    <a href="/">Back to homepage.</a>
    `)
   }else {
    res.send(`
    <p>Sorry, that is incorrect.</p>
    <a href="/">Back to homepage.</a>
    `)

   }
}) //What will we do for the post request for this url


ourApp.get('/answer', function(req, res) {
    res.send("Are you lost? There is nothing to see here.")
}) //What will we do for the post request for this url

//first argument: the url you are looking up for; second argument: it will be run anytime you send request to the first argument.
ourApp.listen(3000)

