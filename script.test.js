document.body.innerHTML = `<form id="form" action="submit" >
        <div>
            <label for="title">*Title: </label>
            <input type="text" id="title" minlength="1" >
            <p id="error-title" class="error"></p>
        </div>
        <div>
            <label for="author">*Author: </label>
            <input type="text" id="author"  minlength="2">
            <p id="error-author" class="error"></p>
        </div>
        <div class="lastchild">
            <label for="red">*I've read this book:</label>
            <input type="checkbox" name="" id="red" class="checkbox" checked>
        </div>      
        <button type="submit"  id="submit-btn" title="complete form">ADD BOOK</button>
    </form>
    <div id="container" class="container"></div>
    <div class="save">
        <button id="local" class="local">SAVE CHANGES</button>
    </div>`

    import {formValidator, validate} from './formValidation'
    import {library, Book} from './Books'

    





test('author has to have at least two character',()=>{
    
    expect(formValidator.validateAuthor('')).toBe('*it has to have at least two character')
    expect(formValidator.validateAuthor('ab')).toBeFalsy();
});
test('title has to have at least two character',()=>{
    expect(formValidator.validateTitle('')).toBe('*it has to have at least one character')
    expect(formValidator.validateTitle('1')).toBeFalsy();
})
test('both field mast be valid for form to be submitable',()=>{
    const author = document.getElementById('author'),
        title = document.getElementById('title');
        title.value = 'aaa'
        author.value = 'aa'

    expect(formValidator.validateInput()).toBeTruthy();
        title.value = ''
        author.value = ''

    expect(formValidator.validateInput()).toBeFalsy();
     title.value = 'aa'
        author.value = 'a'

    expect(formValidator.validateInput()).toBeFalsy();
        title.value = 'a'
        author.value = ''

    expect(formValidator.validateInput()).toBeFalsy();

        title.value = ' '
        author.value = 'aaaa'

    expect(formValidator.validateInput()).toBeFalsy();

});

test('on submit, element with a class items is appended to the element with id container',()=>{
    const container = document.getElementById('container');
    const initialCount = container.childElementCount;
validate(true);
const secondCount = container.childElementCount;
let difference = secondCount - initialCount;
expect(difference).toBe(1);
validate(false);
const finalCount = container.childElementCount;
difference = finalCount - secondCount;
expect(difference).toBe(0);
});

test('on submit, new instance of book is created with values from the input fields ',()=>{
   const title = document.getElementById('title'),
              author = document.getElementById('author'),
              red = document.getElementById('red'),
 valTitile = 'baba',
 valAuthor = 'autor',
valRed = true;
title.value = valTitile
author.value = valAuthor
red.checked = valRed;
validate(true)
const h2 = document.querySelector(`div[id='0'] h2`)
const h3 = document.querySelector(`div[id='0'] h3`)
const button = document.querySelector('.toggle')
    expect(library.getBooks()[0]).toEqual({title:valTitile, author: valAuthor, red:valRed});
    expect(h2.textContent).toBe(valTitile);
expect(h3.textContent).toBe(valAuthor);
expect(button.textContent).toBe('Yes');


});

test('I can toggle red status of a book with specific index',()=>{
    const title = document.getElementById('title'),
              author = document.getElementById('author'),
              red = document.getElementById('red');
title.value = 'baba'
author.value = 'autor'
red.checked = true;
validate(true);
const button = document.querySelector('.toggle')
expect(button.textContent).toBe('Yes');
library.updateBook(0);
expect(library.getBooks()[0].red).toBe(false);
expect(button.textContent).toBe('No');
})
test('I can delete book with specific index',()=>{
    const title = document.getElementById('title'),
              author = document.getElementById('author'),
              red = document.getElementById('red');
title.value = 'baba'
author.value = 'autor'
red.checked = true;
validate(true);
const lengthOne = library.getBooks().length;
library.removeItem(0);
const lengthTwo = library.getBooks().length;
const final = lengthTwo - lengthOne
expect(final).toEqual(-1);
})
test('I can save changes to local storage',()=>{
    library.saveLocaly();
    expect(JSON.parse(localStorage.getItem('save'))).toEqual(library.getBooks())
})





