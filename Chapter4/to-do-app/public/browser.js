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