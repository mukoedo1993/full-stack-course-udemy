const ObjectID = require('mongodb').ObjectID //A class representation of the BSON ObjectId type course 73rd // pass a single string of text, and it 
//will return as a objectID type of object.


const postsCollection = require('../db').db().collection("posts") // to access to the database

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
        let post = await postsCollection.findOne({_id: new ObjectID(id)})

        if (post) {
            resolve(post)
        } else {
            reject()
        }

    })
}

module.exports = Post