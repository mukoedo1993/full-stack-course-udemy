let express = require('express')
let mongodb = require('mongodb') //We will use this package to open a connection taht lives in our mongodb atlas account


let app = express()

let db

let connectionString = 'mongodb+srv://mukoedo1993:WOAIblacktea1997@cluster0.cdyfn.mongodb.net/ToDoList?authSource=admin&replicaSet=atlas-mccbpg-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
// replace the 'test' with 'ToDoList': So our target database will be ToDoList


mongodb.connect(connectionString, {useNewUrlParser: true}, function(err, client){
  db = client.db()
  app.listen(3000)
})

app.use(express.urlencoded({extended: false}))

app.get('/',function(req, res) { //
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
      <form action="/create-item" method="POST">     <!--It is the form that user actually typed into and send to.-->
        <div class="d-flex align-items-center">
          <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;"> <!-- send the message via name  -->
          <button class="btn btn-primary">Add New Item</button>
        </div>
      </form>
    </div>
    
    <ul class="list-group pb-5">
      <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text">Fake example item #1</span>
        <div>
          <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
          <button class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
      </li>
      <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text">Fake example item #2</span>
        <div>
          <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
          <button class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
      </li>
      <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text">Fake example item #3</span>
        <div>
          <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
          <button class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
      </li>
    </ul>
    
  </div>
  
</body>
</html>`)
})


app.post('/create-item', function(req, res) {

    //course 28th: 
    db.collection('items').insertOne({text: req.body.item}, function() {
      res.send("Thanks for submitting the form.")
    }) //mongodb could have multiple collections. So, it choose the collection of items from db, and then insert the item with property: text, value: req.body.item.
    // Then, send the feedback via res: Thanks for submitting the form.


    console.log(req.body.item) // the real part of our item
    
})
