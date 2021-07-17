const bcrypt = require("bcryptjs")

const userCollection = require('../db').db().collection("users") // within mongodb; it's the object that represents our database collection
//require('../db') exports our client, and db() will call the database.

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
    if (this.data.password.length > 50 ) {
        this.errors.push("Password cannot exceed 50 chars")
    }

    if (this.data.username.length > 0 && this.data.username.length < 3) {
        this.errors.push("Username must be at least 3 chars")
    }
    if (this.data.username.length > 30 ) {
        this.errors.push("Username cannot exceed 30 chars")
    }
}




User.prototype.login = function(){
          return new Promise((resolve, reject) => {
            // We could make asynchronous operations here, i.e., operations that take some time to complete.
            this.cleanUp()



            // CRUD Operations <- esp., contextually, R here...
            // Luckily, the mongodb is modern. We could not only use findOne method with callback approach, but this function with findOne will also return a promise.
            userCollection.findOne({username: this.data.username}).then((attemptedUser) =>{
                if(attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) { //If it exists, then we have actually found the user, otherwise, the user just doesn't exist...
                    //In this context, we need to make sure that this keyword will not comeback to bite us...
                    // Because there is not an object that directly calls this function, so this will be considered as a global object here...
                    //Arrow function: The benefits for arrow function are that it will not manipulate or change the this keyword. So, whatever, the keyword this is set outside the function,
                    // is what will still equal.
                    //Update on course 61st: we will compare unhashed attempted users' password(RHS) with the injected users' password(LHS) in our database.
        
                  resolve("Congrats!")
                 
                }else{
                    reject("Invalid username / password")
                }
            }).catch( function() {
                reject("Please try again later.") // server error we didn't account for.
            }) 
          })  
}


User.prototype.register = function() {
    // Step #1: Validate user data:
    this.cleanUp()
    this.validate()


    // Step #2: Only if there are no validation errors, then save the user data into database.
    if(!this.errors.length ) {

        // hash user passwords
        let salt = bcrypt.genSaltSync(10)

        this.data.password = bcrypt.hashSync(this.data.password ,salt) //first value is tha password you want to encrypt, the second value is the salt value.


        console.log(this.data)
        userCollection.insertOne(this.data) //because we have already cleaned up and validate that data.
        
    }
}

module.exports = User