

const form = document.getElementById('form'),
 local = document.getElementById('local'),
 title = document.getElementById('title'),
author = document.getElementById('author');

class FormValidation {
    constructor(form) {
        this.form = form;
        this.errors = {author:'',title:''};
    };

    displayErrorsTitle(){
        const errorTitle = document.getElementById('error-title'),
        title = document.getElementById('title')

        if(this.errors.title){
            errorTitle.innerText = this.errors.title;
            title.classList.add('error-input')
        } else {
            errorTitle.innerText = this.errors.title;
            title.classList.remove('error-input');
        }

    }

    displayErrorsAuthor(){
        const errorAuthor = document.getElementById('error-author'),
        author = document.getElementById('author');
        if (this.errors.author){
            author.classList.add('error-input');
            errorAuthor.innerText = this.errors.author; 
        } else {
            author.classList.remove('error-input');
             errorAuthor.innerText = this.errors.author    
        }
    }

    validateTitle(title){
        if (!title.trim()){
            this.errors.title = 'it has to have at least one character';
        } else {
            this.errors.title = '';
        }
        this.displayErrorsTitle();
    }
    validateAuthor(author){

        if (author.trim().length <= 1){
            this.errors.author = '*it has to have at least two character'
            
        } else {
            this.errors.author = ''
        };
     this.displayErrorsAuthor();
     return this.errors.author
    };

    validateInput(){
        const author = document.getElementById('author'),
        title = document.getElementById('title');
       this.validateAuthor(author.value);
       this.validateTitle(title.value);
     return  this.calculateResult();
    }
    calculateResult(){
        if  (this.errors.author === '' && this.errors.title === ''){
            console.log('ses')
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
    
        this.#books.unshift(new Book(title.value.trim().replace((/[\s]+/g),' '),author.value.trim().replace((/[\s]+/g),' '),red.checked));
        title.value = '';
        author.value = '';
        red.checked = true;
    };
    displayBooks(){
        const container = document.getElementById('container');
        container.innerHTML = '';

        this.#books.forEach((book, index)=>{
           const {author,title, toggleRed, red } = book
           let response = '';
           if (red) {
               response = 'Yes'
           }
           else {
               response = 'No'
           }

           container.innerHTML += `<div data-attribute=${index} id=${index} class=' items ${red}'>
                                        <div class='inner'>
                                            <div class='info'>
                                                <h2></h2>
                                                <hr>
                                                <h3></h3>
                                            </div>
                                            <div class='controls'> 
                                             <div> 
                                                <p>Did you read it?</p>
                                                <button class='toggle' value=${index}>${response}</button>
                                             </div>
                                                <button class='delete' value=${index}>Delete</button>
                                            </div>
                                        </div>
                                    </div>`
                                    const h2 = document.querySelector(`div[id='${index}'] h2`)
                                    const h3 = document.querySelector(`div[id='${index}'] h3`)
                                    h2.innerText = title;
                                    h3.innerText = author;
        })
    }

    saveLocaly(){
        localStorage.setItem('save',JSON.stringify(this.#books))
    }

    savedDisplay(){
        if (localStorage.getItem('save') !== null){
        const save = JSON.parse(localStorage.getItem('save'))
        console.log(save)
        save.map(item =>{
          const  {title, author, red} = item
            this.#books.push(new Book(title,author,red))
        
        })
        this.displayBooks()
    } else return;
    }

    updateBook(index){
        console.log(this.#books)
        const element = document.getElementById(index)
        const buton = element.querySelectorAll('.toggle')
        this.#books[index].toggleRed()

        if (this.#books[index].red === false){
            element.classList.remove('true')
            element.classList.add('false')  
        } else {
            element.classList.remove('false')
            element.classList.add('true')
        }
        buton.forEach((button)=>{
            if (this.#books[index].red){
                button.innerText = 'Yes';
            }
            else {
                button.innerText = 'No';
            }

        })
    }
  
    removeItem(btn){
        const items = document.querySelectorAll('.items');
        const btns = document.querySelectorAll('.items button');
if (this.#books.length === 1){
            this.#books = [];
        }
        this.#books.splice(btn.value,1)
        items.forEach((item)=>{
            if (item.dataset.attribute === btn.value) {
                item.remove()
            } else if (item.dataset.attribute > btn.value) {
                item.dataset.attribute--;  
                item.id--;
            }
        })
        btns.forEach((botun)=>{
            if (botun.value > btn.value){
                botun.value--

            }
        })
    }
}

const formValidator = new FormValidation(form),
library = new BooksArray();

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

export { formValidator }

