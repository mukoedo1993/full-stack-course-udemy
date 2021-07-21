const bcrypt = require("bcryptjs")

const usersCollection = require('../db').db().collection("users") // within mongodb; it's the object that represents our database collection
//require('../db') exports our client, and db() will call the database.

const validator = require("validator")

const md5 = require('md5')

let User = function(data, getAvatar){ //ctor.
   this.data = data // store the user's input in this object.
   
   this.errors = []

   if (getAvatar == undefined) //which means that you don't give the second argument at all.
   {
       getAvatar = false
   }

   if (getAvatar) //if it is true
   {
        this.getAvatar() // this method is going to automatically create a hash based on the current email and generate the gravatar URL
   }
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
    return new Promise(async (resolve, reject) => { //turn the function into an async function
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
            console.log("hehe")
            this.errors.push("Username must be at least 3 chars")
        }
        if (this.data.username.length > 30 ) {
            this.errors.push("Username cannot exceed 30 chars")
        }
    
        // Only if username is valid then check to see if it's already taken. 
        // The point is that itr's meaningless to waste energy to trigger database if it is not even a valid username.
        if (this.data.username.length > 2 && this.data.username.length < 31 && validator.isAlphanumeric(this.data.username)) {
            let usernameExists = await usersCollection.findOne({username: this.data.username}) // If mongodb does find a matching document, that's what this promise will resolve to.
            // await keyword: the Javascript will freeze for the operations until this operation actually resolves this projects.
            console.log("hehe")
    
            if(usernameExists) {
                this.errors.push("That username is already taken.")
            }
        }
    
        // // Only if email is valid then check to see if it's already taken. 
        if (validator.isEmail(this.data.email)) {
            let emailExists = await usersCollection.findOne({email: this.data.email}) // If mongodb does find a matching document, that's what this promise will resolve to.
            // await keyword: the Javascript will freeze for the operations until this operation actually resolves this projects.
            
    
            if(emailExists) {
                this.errors.push("That email is already being used.")
            }

           
        }
        resolve() // to signify this operation of promise has actually completed.
    }
    )
}



User.prototype.login = function(){
          return new Promise((resolve, reject) => {
            // We could make asynchronous operations here, i.e., operations that take some time to complete.
            this.cleanUp()



            // CRUD Operations <- esp., contextually, R here...
            // Luckily, the mongodb is modern. We could not only use findOne method with callback approach, but this function with findOne will also return a promise.
            usersCollection.findOne({username: this.data.username}).then((attemptedUser) =>{
                if(attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) { //If it exists, then we have actually found the user, otherwise, the user just doesn't exist...
                    //In this context, we need to make sure that this keyword will not comeback to bite us...
                    // Because there is not an object that directly calls this function, so this will be considered as a global object here...
                    //Arrow function: The benefits for arrow function are that it will not manipulate or change the this keyword. So, whatever, the keyword this is set outside the function,
                    // is what will still equal.
                    //Update on course 61st: we will compare unhashed attempted users' password(RHS) with the injected users' password(LHS) in our database.
                  this.data = attemptedUser
                    this.getAvatar()
                  resolve("Congrats!")
                 
                }else{
                    reject("Invalid username / password")
                }
            }).catch( function() {
                reject("Please try again later.") // server error we didn't account for.
            }) 
          })  
}


User.prototype.register = function(){
    return new Promise(async (resolve, reject) => {
        // Step #1: Validate user data:
        this.cleanUp()
        await this.validate()
    
    
        // Step #2: Only if there are no validation errors, then save the user data into database.
        if(!this.errors.length ) {
    
            // hash user passwords
            let salt = bcrypt.genSaltSync(10)
    
            this.data.password = bcrypt.hashSync(this.data.password ,salt) //first value is tha password you want to encrypt, the second value is the salt value.
    
    
            console.log(this.data)
            await usersCollection.insertOne(this.data) //because we have already cleaned up and validate that data.
            //we need to make sure this operation will compelte before resolve is called...

            this.getAvatar() // include this after database action. We don't want to save avatar url in the database permanently.
            // Counterarguemnt: What if gravatar change the url structures? At that point, we would have to go to every user account in my database and update avatar database field.
            // ... It's more meaningful for we to generate it on the fly when we need it, in the memory.

            resolve()
        } else {
            reject(this.errors)
        }
    })
}

User.prototype.getAvatar = function(){

    this.avatar = `https://gravatar.com/avatar/${md5(this.data.email)}?s=128`
}


User.findByUsername = function(username) { //Our controller is going to pass in whatever the username at the end of the URL

    return new Promise(function(resolve, reject) {
        if (typeof(username) != "string") { // If a malicious user wants to pass an object, we don't want it to be passed to mongodb.
            reject()
            return // prevent further execution of that function
        }

        usersCollection.findOne({username: username}) //second username is the argument for the function
        .then(function(userDoc) {
            if (userDoc) {

                userDoc = new User(userDoc, true) // take the raw data from the database that has fields like username and email, and we are using them to create a 
                                                  //new User document.

                userDoc = {
                    _id: userDoc.data._id,
                    username: userDoc.data.username,
                    avatar: userDoc.avatar
                }

                resolve(userDoc)
            }
            else {
                reject()
            }


        }).catch(function() {
            reject() //It will be rejected for some sort of technical errors or database connection problems. But for the endplace user seeing, they could only see a 404 for the time being....
        })
    })
}
module.exports = User