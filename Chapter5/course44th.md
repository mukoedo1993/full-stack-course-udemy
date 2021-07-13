The Footer
Did you notice the outdated year down in the footer of our app/template? To have that read 2021 (or whatever the current year is) we can simply edit that bit of the EJS/HTML template and replace the hardcoded 2019 with 
```<%= new Date().getFullYear() %>```
 instead. We'll learn more about this EJS syntax later in the course, but this quick tip will let your footer date be dynamic.

Cheers,
Brad