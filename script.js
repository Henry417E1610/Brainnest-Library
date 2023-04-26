const form = document.getElementById('form')
//const submit = document.getElementById('submit-btn'),
const deleteBtn = document.getElementsByClassName('delete');
const local = document.getElementById('local');
const save = JSON.parse(localStorage.getItem('save'))



class FormValidation {
    constructor(form) {
        this.form = form;
        this.errors = {};
    };
    validateInput(){
        const title = document.getElementById('title'),
              author = document.getElementById('author')

        if (!title.value.trim() || typeof title.value !== 'string'){
            this.errors.title = 'it has to have at least one character'
        } else {
            this.errors.title = ''
        }

        if (!author.value.trim().length > 1 || typeof author.value !== 'string'){
            this.errors.author = 'it has to have at least one character'
        } else {
            this.errors.author = ''
        };

        if  (this.errors.author === '' && this.errors.title === ''){
            return true
        } else {
            return false
        }
    }
}

class Book{

    constructor(title, author, red){
        this.title = title;
        this.author = author;
        this.red = red    
   };
   
    toggleRed(){

        if (this.red === false){
        this.red = true;
        } else {
            this.red = false;
        }
    }
    


}

class BooksArray {

        #books = [];

    addBook(){
        const title = document.getElementById('title'),
              author = document.getElementById('author'),
              red = document.getElementById('red');

              
        this.#books.unshift(new Book(title.value,author.value,red.checked));
        title.value = '';
        author.value = '';
        red.checked = true;
    };
    displayBooks(){
        const container = document.getElementById('container');
        container.innerHTML = '';

        this.#books.forEach((book, index)=>{
           const {author,title, toggleRed, red } = book

           container.innerHTML += `<div data-attribute=${index} id=${index} class='items ${red}'>
                                    <p>${author} ${title}<p>  
                                    <button class='delete' value=${index}>delete</button>
                                    <button class='toggle' value=${index}>
                                   </div>`
           
        })
    }

    saveLocaly(){
        localStorage.setItem('save',JSON.stringify(this.#books))
    }

    savedDisplay(){
        const save = JSON.parse(localStorage.getItem('save'))
        this.#books = save;
        this.displayBooks()

    }

    updateBook(index){
        const element = document.getElementById(index)
        this.#books[index].toggleRed()
        if (this.#books[index].red === false){
            element.classList.remove('true')
            element.classList.add('false')
        } else {
            element.classList.remove('false')
            element.classList.add('true')
        }

    }
  
    removeItem(btn){
        const items = document.querySelectorAll('.items');
        this.#books.splice(btn.value,1)
        if (this.#books.length === 1){
            this.#books = [];
        }
        items.forEach((item)=>{
            if (item.dataset.attribute === btn.value) {
                item.remove()
            }
        })
    }
}



const formValidator = new FormValidation(form),
library = new BooksArray();
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
        library.removeItem(e.target)
        } else {
            library.updateBook(e.target.value)
            
        }
    }

})

local.addEventListener('click',()=>{
    library.saveLocaly()
})

