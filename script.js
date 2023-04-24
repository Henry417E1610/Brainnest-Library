

let books = [];
class Book{

    constructor(title, author){
        this.title = title;
        this.author = author;    
   };
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

let jure = new Book('jeo','  dasdsa ');

function addBook(value){
    if (value instanceof Book && value.author ){
        books.push(value)
    } else {
        console.log('fail')    }

}
