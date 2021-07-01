# COURSE 25TH & 26TH & 27TH#
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

