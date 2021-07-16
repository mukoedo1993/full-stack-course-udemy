const userCollection = require('../db').collection("users") // within mongodb; it's the object that represents our database collection

const validator = require("validator")

let User = function(data){ //ctor.
   this.data = data // store the user's input in this object.
   
   this.errors = []
}

User.prototype.cleanUp = function() {
    if (typeof(this.data.username) != "string") {
        this.data.username = ""
    }

    if (typeof(this.data.email) != "string") {
        this.data.email = ""
    }

    if (typeof(this.data.password) != "string") {
        this.data.password = ""
    }

    // get rid of any bogus properties
    this.data = {
        username: this.data.username.trim().toLowerCase(),  //trim method: get rid of any spaces at the beginning or ending of the values....
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password
        //So any other entered properties by clients will be ignored since here...
    }
 }

User.prototype.validate = function() {
    if (this.data.username == "") {
        this.errors.push("You must provide a user name!")
    }

    if (!validator.isEmail(this.data.email)) {
        this.errors.push("You must provide a valid email address!")
    }

    if(this.data.username != "" && !(validator.isAlphanumeric(this.data.username))) {
        this.errors.push("Usernames can only contain letters and numbers.")}

    if (this.data.password == "") {
        this.errors.push("You must provide a password!")
    }

    if (this.data.password.length > 0 && this.data.password.length < 12) {
        this.errors.push("Password must be at least 12 chars")
    }
    if (this.data.password.length > 100 ) {
        this.errors.push("Password cannot exceed 100 chars")
    }

    if (this.data.username.length > 0 && this.data.username.length < 3) {
        this.errors.push("Username must be at least 3 chars")
    }
    if (this.data.username.length > 30 ) {
        this.errors.push("Username cannot exceed 30 chars")
    }
}

User.prototype.login = function(callback){
    this.cleanUp()

    // CRUD Operations <- esp., contextually, R here...
    userCollection.findOne({username: this.data.username} , (err, attemptedUser) => {
        if(attemptedUser && attemptedUser.password == this.data.password){ //If it exists, then we have actually found the user, otherwise, the user just doesn't exist...
            //In this context, we need to make sure that this keyword will not comeback to bite us...
            // Because there is not an object that directly calls this function, so this will be considered as a global object here...
            //Arrow function: The benefits for arrow function are that it will not manipulate or change the this keyword. So, whatever, the keyword this is set outside the function,
            // is what will still equal.

          callback("Congrats!")

        }else{
            callback("Invalid username / password")
        }
    }) //first arguemnt: the pair of data to match, i.e., condition; second argument: a function once the matching of 1st arguemnt
                                                               // has finished and completed,  because we don't know how long it will take...
                            
}

User.prototype.register = function() {
    // Step #1: Validate user data:
    this.cleanUp()
    this.validate()


    // Step #2: Only if there are no validation errors, then save the user data into database.
    if(!this.errors.length ) {
        console.log(this.data)
        userCollection.insertOne(this.data) //because we have already cleaned up and validate that data.
        
    }
}

module.exports = User