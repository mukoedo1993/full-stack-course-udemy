const ObjectID = require('mongodb').ObjectID //A class representation of the BSON ObjectId type course 73rd // pass a single string of text, and it 
//will return as a objectID type of object.


const postsCollection = require('../db').db().collection("posts") // to access to the database

const User = require('./User')

let Post = function(data, userid) {
    this.data = data // incoming requests body data
    this.errors = []
    this.userid = userid
}

// To make sure that both our titles and text fields are strings, rather than malicious objects or other weird things...
Post.prototype.cleanUp = function() {
    if(typeof(this.data.title) != "string") { this.data.title = ""}
    if(typeof(this.data.body) != "string") { this.data.body = ""}

    // make sure that user didn't pass any bogus property in the form data:
    // get rid of any bogus properties
    this.data = {
        title: this.data.title.trim(),
        //trim():Removes the leading and trailing white space and line terminator characters from a string.
        body: this.data.body.trim(),
        createdDate: new Date(),// It is built-in blueprint for Date object, so this will return a Date object represents the current time when this code is executed.

        // Actually, mongodb  has a special way to treat id values. To honor that, we could:
        author: ObjectID(this.userid)
    }
}

Post.prototype.validate = function() {
    if(this.data.title == "") {
        this.errors.push("You must provide a title. ")
    }

    if(this.data.body == "") {
        this.errors.push("You must provide post content. ")
    }
}

Post.prototype.create = function() { //where we will actually store our data in our database
    //We want the function to return a promise

    return new Promise((resolve, reject) => {
        this.cleanUp()
        this.validate()

        if (!this.errors.length) {
            //save post into database

            postsCollection.insertOne(this.data).then(() => {
                console.log(this.data)
                resolve()//to complete this process
        }).catch(() => {
            this.errors.push("Please try again later.") // server problem, not users' or database's connection problem.

            reject(this.errors)
        }) // However, it is an asynchronous operation. We have no idea how long 
          

        } else {
            reject(this.errors)
        }
    })

}

Post.findSingleById = function(id) {
    return new Promise(async function (resolve, reject) {
        
        // make sure the requested id make sense and isn't malicious
        if( typeof(id) != "string" || !ObjectID.isValid(id)) { // if 
            reject()
            return // to prevent any further exection
        }

        //timing! attention!
        let posts = await postsCollection.aggregate([
            {$match: {_id: new ObjectID(id)}}, // perform a match by the requested id
            {$lookup: {from: "users", localField: "author", foreignField: "_id", as: "authorDocument"}},   //when we are looking for the user collection from the matching documents, the localField, or the 
            //field in the current post item we want to perform that match on. Local means the curent collection, foreign means other collection we are looking up. And the field we 
            //want to look on the foreign field is the id field...
            //as: the as property: mongodb will use this name, authoerDocument, when it adds on a virtual field of property with the matching user document to this post.


            {$project: {
                title: 1,
                body: 1,
                createdDate: 1,
                author: {$arrayElemAt: ["$authorDocument", 0]} //set author as first item in the array of authorDocument

            }}
            

        ]).toArray() //It is great when you need to do multiple operations
        //we need toArray function to return a promise, because talking to the database is an asynchronous operation.

        // clean up author property in each post object: 
        posts = posts.map(function(post) {

            //We only want the author object to have two properties, here.
            post.author = {
                username: post.author.username,
                avatar: new User(post.author, true).avatar //The avatar property of a new User object.
            }


            return post
        })


        if (posts.length) {
            console.log(posts[0])

            
            resolve(posts[0])
        } else {
            reject()
        }

    })
}

module.exports = Post