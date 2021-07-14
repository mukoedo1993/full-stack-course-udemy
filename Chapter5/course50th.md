Note About Arrow Functions & The "this" Keyword
Throughout the rest of the course you'll notice many times where I use a traditional function instead of an arrow function. While I encourage you to use arrow functions where you want to instead of following me character for character, I do want to point out one exception.

In our Model files for this complex app we are using an object-oriented approach to our code. This means there are many cases where our code absolutely does rely on the this keyword pointing towards the object that is calling the method.

Remember, the arrow function isn't just about a cleaner / more minimal syntax, it also doesn't change the value of the this keyword to point towards the object that called the method (the way that a traditional function would).

Ultimately, what does this mean? It means when we are writing code together in a Model file, if you use an arrow function where I use a traditional function and then you run into an error, please try to remember that your arrow function is very likely the culprit. You can always test this out by using ```console.log(this)``` inside the body of your function to make sure it's pointing towards what you expect.

Please feel encouraged to use arrow functions anywhere else you desire! They are great, but when you use one try to think about what you want the ```this``` keyword to be pointing towards.

If this article wasn't clear; that's okay, I've created a CodePen example to demonstrate the issue I'm describing:

https://codepen.io/learnwebcode/pen/zYKgpNp?editors=0010

If you're still confused about the `this` keyword you can always go back and revisit the Scope & Context video lessons in the opening "10 Days of JavaScript" chapter of this course.

Enjoy!
Brad
