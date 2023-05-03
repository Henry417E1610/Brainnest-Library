

const form = document.getElementById('form'),
 local = document.getElementById('local'),
 title = document.getElementById('title'),
author = document.getElementById('author');
import { formValidator } from "./formValidation.js";
import { library } from "./Books.js";

author.addEventListener('input',()=>{
    formValidator.validateAuthor(author.value)
})
 title.addEventListener('input',()=>{
            formValidator.validateTitle(title.value)
})
library.savedDisplay()

form.addEventListener('submit',(event)=>{
    event.preventDefault()
    
    const formIsValid = formValidator.validateInput();
    console.log(formIsValid)
    if (formIsValid) {
        library.addBook();
        library.displayBooks();
    } else {
        console.log(Object.values(formValidator.errors))
    }  
})

container.addEventListener('click',(e)=>{
    console.log(e.target.classList[0])
    if (e.target.value){
        console.log(e.target.value)
        if (e.target.classList[0] === 'delete') {
            if (confirm("Are you sure you would like to delete this book?")) {
                library.removeItem(e.target)
            }            
        } else {
            library.updateBook(e.target.value)
        }
    }
})

local.addEventListener('click',()=>{
    library.saveLocaly()
    alert('You saved changes to your collection!')
})

