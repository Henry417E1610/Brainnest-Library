const title = document.getElementById('title'),
author = document.getElementById('author'),
red = document.getElementById('red'),
submit = document.getElementById('submit-btn'),
container = document.getElementById('container')
validateTitle = function(){
    if (!title.value.trim() || !author.value.trim()){
        submit.disabled = true
    } else {
        submit.disabled = false
    }
},
validateAuthor = function(){
    if (!author.value.trim() || !title.value.trim()){
        submit.disabled = true
    } else {
        submit.disabled = false
    }
};

title.onkeyup = validateTitle;
author.onkeyup = validateAuthor;

let books = [];
class Book{

    constructor(title, author, red){
        this.title = title;
        this.author = author;
        this.red = red    
   };
   set red(value){
    if (typeof value !== 'boolean'){
        console.log('fail')
    } else {
        this._red = value
    }
   }
   get red() {
    return this._red
   }
    set author(value){
    if (!value.trim() || typeof value !== 'string'){
            console.log('nece ici')
        } else {
     this._author = value.trim();
        }
    }
    set title(value){
       if (!value.trim() || typeof value !== 'string'){
            console.log('nece ici')
        } else {
     this._title = value.trim();
        }
    }
    get title(){
        return this._title;
    }
    get author(){
        return this._author;
    }
    toggleRed = function(){
        if (this._red === false){
        this._red = true;
        } else {
            this._red = false;
        }
    }
    


}



function addBook(value){
    if (value instanceof Book){
        books.push(value)
    } else {
        console.log('fail')    }

}
submit.addEventListener('click',(event)=>{
    console.log(red.value)
    addBook(new Book(title.value, author.value, red.checked))
    

    event.preventDefault()
})
