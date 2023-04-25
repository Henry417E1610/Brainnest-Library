const form = document.getElementById('form')
//const submit = document.getElementById('submit-btn'),
const deleteBtn = document.getElementsByClassName('delete');



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
   
    toggleRed = function(){
        if (this._red === false){
        this._red = true;
        } else {
            this._red = false;
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
    };
    loadBooks(){
        const container = document.getElementById('container');
        container.innerHTML = '';

        this.#books.forEach((book, index)=>{
           const {author,title} = book
           

           container.innerHTML += `<div data-attribute=${index} class='items'>
                                    ${author} ${title} 
                                    <button class='delete' value=${index}>delete</button>
                                   </div>`

        })
    }
    liveAddBook(){
        const container = document.getElementById('container');
         const {author, title} = this.#books[0] 
          container.innerHTML = ''

         this.#books.forEach((book, index)=>{ 
           if (index > 0){
           container.innerHTML += `<div data-attribute=${index++} class='items'>
                                    ${book.author} ${book.title}
                                    <button class='delete' value=${index++}>delete</button>
                                   </div>`
           }
        })

        container.innerHTML = `<div data-attribute='0' class='items'>
                                ${author} ${title}
                                <button class='delete' value='0'>delete</button>
                               </div>
                               ${container.innerHTML}`
    }
    removeItem(btn){
        const items = document.querySelectorAll('.items');
        this.#books.splice(btn.value,1)
        items.forEach((item)=>{
            if (item.dataset.attribute === btn.value) {
                item.remove()
            } else if (item.dataset.attribute > btn.value) {
                btn.value -= 1
                item.dataset.attribute -= 1
            }

        })
    }
}



const formValidator = new FormValidation(form),
library = new BooksArray();

library.loadBooks()
form.addEventListener('submit',(event)=>{
    event.preventDefault()
    
    const formIsValid = formValidator.validateInput();
    console.log(formIsValid)
    if (formIsValid) {
        library.addBook();
        library.liveAddBook();
        

    } else {
        console.log(Object.values(formValidator.errors))
    }


    
})

container.addEventListener('click',(e)=>{
    if (e.target.value){
        library.removeItem(e.target)
    }

})

