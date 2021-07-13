# COURSE 25TH & 26TH & 27TH #
27th: Permanently store our data in database.
<br>
On terminal:
```
npm init -y
npm install express
npm install nodemon
nodemon server
npm install mongodb


 npm run watch# run locally while keep watching any change related to our code...
```

On our local config file, i.e., package.json here, we need to modify:
```
#package.json:
...
 "scripts": {
    "watch":"nodemon server",
    ...
```
# course 33RD #
Within server.js file, what should we do if someone send a get request to the base url or our homepage.
But now, we want to wait to read data from database, and after the database have completed and we have 
the data, before we then actually send back the response.


# course 32ND #
It is expected that once a user just simply submitted a form, there shouldn't be too much reload, refresh or anything
else. Allow our server to send to our server on the fly without reloading a new URL.


Google axios.js
```
promise.then().catch() //inside the then you could enter a function that has no chance to run until the action has a chance to complete. If there is something wrong with then, the catch inside catch will be run.

//An HTML5 feature that lets us embed data right in our HTML:
<button data-blahblahblah="">

```


Lesson Overview:

- Part 1: User interface / Send their new typed in text value to our Node server.
- Part 2: Write Node code to update document in MongoDB database.



# course 34TH # 
Delete feature.


# course 35TH #
Create new item without page reloading.


# course 36TH #
Remove duplication of item HTML template so it's not awkwardly sitting in both our backend code and frontend code.

# course 37TH #
```
npm install sanitize-html #sanitize potential dangerous malicious HTML injection of data into your mongodb...
```