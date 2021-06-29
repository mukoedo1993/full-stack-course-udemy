// COURSE 18th
// A very simple server for listening to incoming messages.
let http = require("http")

let ourApp = http.createServer(function(req, res){ //request response
    console.log(req.url)
    if(req.url == "/"){
    res.end("Hello, and welcome to our website.")
    }

    if(req.url == "/about") {
        res.end("Thank you for the interest in our company.")
    }


    res.end("We cannot find the page you are looking for.")
}) // to listen incoming events
ourApp.listen(3000) //300 is port number
