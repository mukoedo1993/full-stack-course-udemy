function itemTemplate(item) {
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span> <!--item._id or item.text-->
    <div>
      <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit!</button>
      <!--The unique id that mongodb generates for us is underscore id.-->
      <button  data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`
}



// Initial Page Load Render:
// Locate the li with id "item-list"
let ourHTML = items.map(function(item){
    return itemTemplate(item)
}).join('') //It is an array then joined into a big string of HTML text.
// Instead of being separated by commas, now, nothing will separate these...


document.getElementById('item-list').insertAdjacentHTML("beforeend", ourHTML)


// Create feature:
let createField = document.getElementById('create-field')

document.getElementById('create-form').addEventListener('submit' , function(e0){
    // We want to prevent default behaviors. We don't want to send a traditional request to the server.
   e0.preventDefault()
   console.log(createField)
   axios.post('/create-item', { text: createField.value}).then(function (response) { //Here, response is the server's response back to the browser.

   //create the HTML for a new item
   document.getElementById("item-list").insertAdjacentHTML("beforeend" , itemTemplate(response.data)) //It will access the JS object represents the newest data in database that
   //the server sending back to our browser.
    createField.value = "" //So, users don't need to manually clear the input textbox.
    createField.focus() //keep focus




   //We also want to update the item on the fly:

 }).catch(function() {
     console.log("Please try again later.")
 })
})





document.addEventListener('click', function(e){
    //Delete feature
    if (e.target.classList.contains("delete-me")){
        if(confirm("Do you really want to delete this item permanently?")){  //If userInput is not blank, then the value will be true. Otherwise, fa
            //So, now when axios send off our requests to our server, not only we sent off our newly desired text, but we are also sending along
 // which document we are updating.
 axios.post('/delete-item', { id: e.target.getAttribute("data-id")}).then(function () {

     e.target.parentElement.parentElement.remove() //select the overall row for the current item

  }).catch(function() {
      console.log("Please try again later.")
  })
  //axios.post() method is going to prompt a promise. We don't know how an action will take.
 }
    }



    // Update feature
    if (e.target.classList.contains("edit-me")){//HTML element that we actually clicked on has a class edit-me
        let userInput = prompt("entered your desired new text:", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML) // IT will pop-up a window with a blank that allows you to input text.
        // second agrument: prepopulated content


        if (userInput) {  //If userInput is not blank, then the value will be true. Otherwise, fa
                   //So, now when axios send off our requests to our server, not only we sent off our newly desired text, but we are also sending along
        // which document we are updating.
        axios.post('/update-item', {text: userInput, id: e.target.getAttribute("data-id")}).then(function () {

            e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput //select the overall row for the current item
 
         }).catch(function() {
             console.log("Please try again later.")
         })
         //axios.post() method is going to prompt a promise. We don't know how an action will take.
        }
 
    }


})