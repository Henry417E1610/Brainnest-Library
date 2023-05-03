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

        getBooks(){
            return this.#books
        }

    addBook(){
        const title = document.getElementById('title'),
              author = document.getElementById('author'),
              red = document.getElementById('red');
    
        this.#books.unshift(new Book(title.value.trim().replace((/[\s]+/g),' '),author.value.trim().replace((/[\s]+/g),' '),red.checked));
        title.value = '';
        author.value = '';
        red.checked = true;
        return this.#books;
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
                                    h2.textContent = title;
                                    h3.textContent = author;
        })
    }

    saveLocaly(){
        localStorage.setItem('save',JSON.stringify(this.#books))
    }

    savedDisplay(){
        if (localStorage.getItem('save') !== null){
        const save = JSON.parse(localStorage.getItem('save'))
    
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
                button.textContent = 'Yes';
            }
            else {
                button.textContent = 'No';
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

const library = new BooksArray();

export {library, Book}


