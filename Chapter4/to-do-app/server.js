

let express = require('express')
let mongodb = require('mongodb') //We will use this package to open a connection taht lives in our mongodb atlas account
let sanitizeHTML = require('sanitize-html')

let app = express()

let db

app.use(express.static('public')) //course 32nd: server static existing file. Make the content of folder available for the root of our server.





let connectionString = require('./passcode.js') // I add passcode.js to the gitignore, so my passcode will NOT BE VISIBLE to the public. It is much safer. :)

// replace the 'test' with 'ToDoList': So our target database will be ToDoList

//
mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
  db = client.db()
  app.listen(3000)
})


app.use(express.json())//for asynchronicous request:
app.use(express.urlencoded({extended: false}))



function passwordProected(req, res, next) {
 res.set('WWW-Authenticate' , 'Basic realm="Simple Todo App"')
  //next() //It means that this function is done, you should move to the next function you included in the app.get(...) below.
  console.log(req.headers.authorization)

  if(req.headers.authorization == "Basic bGVhcm46amF2YXNjcmlwdA==") {
    next()
  } else {
    res.status(401).send("Authentication required")
  }
}

app.use(passwordProected) // add-on for all of our functions for all of our url


app.get('/', function(req, res) { //

    db.collection('items').find().toArray(function(err , items) { //find: mongodb way of read or reload data.
      res.send(`<!DOCTYPE html>
      <html>

      <head>

      <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Simple To-Do App!!!!</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">


      </head>



      <body>

    
        <div class="container">
          <h1 class="display-4 text-center py-1">To-Do App!!!!</h1>
          
          <div class="jumbotron p-3 shadow-sm">
            <form id="create-form" action="/create-item" method="POST" class="caonima">     <!--It is the form that user actually typed into and send to.-->
              <div class="d-flex align-items-center">
                <input id="create-field" name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;"> <!-- send the message via name  -->
                <button class="btn btn-primary">Add New Item</button>
              </div>
            </form>
          </div>
          <ul id="item-list" class="list-group pb-5">
        
          </ul>

        
          
        </div>


        <script>
        let items = ${JSON.stringify(items)}    <!--It is generated as a global variable.-->
  
        </script>
    <script src="/browser.js"></script> <!--course 32rd--> </script><!--script element's location matters-->
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  
        
     
      </body>

      </html>`)
      
    }) // mongodb is going to find all data in our collection.
    // toArray() to convert it to a JS Array.


  
})


app.post('/create-item', function(req, res) {

    //course 28th: 
  let safeText = sanitizeHTML(req.body.text , {allowedTags: [] , allowedAttributes: {}}) //We don't want any HTML tags or attributes...
  // Now, whatever user entered will be given into safeText variable. And all the code will be cleaned-up text.

    //course 37th: req.body.text might be malicious...
    db.collection('items').insertOne({text: safeText}, function(err , info) { //the RHS text is the property we have set for the asynchronous request.
    
      res.json(info.ops[0])//It represents the js object that we just created...
      
    }) //mongodb could have multiple collections. So, it choose the collection of items from db, and then insert the item with property: text, value: req.body.item.
    // Then, send the feedback via res: Thanks for submitting the form.

    console.log("line 104:")
    console.log(req.body.text) // the real part of our item
    
})


app.post('/update-item', function(req, res){

  let safeText = sanitizeHTML(req.body.text , {allowedTags: [] , allowedAttributes: {}})
  db.collection('items').findOneAndUpdate({_id: new mongodb.ObjectId(req.body.id)}
    ,{$set: {
    text:safeText      //What you really wants to update 

  }},function(){
    res.send("Success!")
  } ) //find one document in your collection and allow you to update.
})


app.post('/delete-item', function(req, res) {
  db.collection('items').deleteOne({_id: new mongodb.ObjectId(req.body.id)}, function(){ // first argument: which document we want to delete; second argument:
    res.send("success")
  })
})
