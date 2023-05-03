const form = document.getElementById('form');
import { library } from "./Books.js";
class FormValidation {
    constructor(form) {
        this.form = form;
        this.errors = {author:'',title:''};
    };

    displayErrorsTitle(){
        const errorTitle = document.getElementById('error-title'),
        title = document.getElementById('title')

        if(this.errors.title){
            errorTitle.textContent = this.errors.title;
            title.classList.add('error-input')
        } else {
            errorTitle.textContent = this.errors.title;
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
            this.errors.title = '*it has to have at least one character';
        } else {
            this.errors.title = '';
        }
        this.displayErrorsTitle();
        return this.errors.title;
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
};
const validate = function(validator){
     if (validator) {
        library.addBook();
        library.displayBooks();
    } else {
        console.log(Object.values(formValidator.errors))
    }  
};

 const formValidator = new FormValidation(form);
 export { formValidator, validate }