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
    const local = require('./script');

    





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
        title.value = ''
        author.value = 'aaaa'

    expect(formValidator.validateInput()).toBeFalsy();

});

test('If form is valid.I can add book item to element with class container by clicking on button with id submit-btn',()=>{
     const container = document.getElementById('container'),
      author = document.getElementById('author'),
        title = document.getElementById('title'),
        submit = document.getElementById('submit-btn');
        title.value = 'aaa'
        author.value = 'aa'
let initialCount = container.childElementCount
submit.click();
let secondCount = container.childElementCount;
let difference = secondCount - initialCount;
    expect(difference).toBe(1);
});
test('by clicking on button(#submit-btn) with invalid input I got error messages in elements #error-author and #error-title',()=>{
const container = document.getElementById('container'),
      author = document.getElementById('author'),
        title = document.getElementById('title'),
        submit = document.getElementById('submit-btn'),
        errorAuthor = document.getElementById('error-author'),
        errorTitle = document.getElementById('error-title');

        title.value = 'aaa';
        author.value = 'a';
submit.click();
expect(errorAuthor.textContent).toBeTruthy;
expect(errorTitle.textContent).toBeFalsy;
title.value = '  ';
        author.value = 'aa';
submit.click();
expect(errorAuthor.textContent).toBeFalsy;
expect(errorTitle.textContent).toBeTruthy;
title.value = '  ';
        author.value = 'a ';
submit.click();
expect(errorAuthor.textContent).toBeTruthy;
expect(errorTitle.textContent).toBeTruthy;
});

test('by clicking on button(#submit-btn) with valid input I got no error messages in elements #error-author and #error-title',()=>{
const container = document.getElementById('container'),
      author = document.getElementById('author'),
        title = document.getElementById('title'),
        submit = document.getElementById('submit-btn'),
        errorAuthor = document.getElementById('error-author'),
        errorTitle = document.getElementById('error-title');

        title.value = 'aaa';
        author.value = 'aa';
submit.click();
expect(errorAuthor.textContent).toBeFalsy;
expect(errorTitle.textContent).toBeFalsy;

});


test('by clicking on button(#submit-btn) with valid input I add element with a class\n .items to the .container, nested h2 contains title, h3 author  ',()=>{
   const title = document.getElementById('title'),
              author = document.getElementById('author'),
              submit = document.getElementById('submit-btn'),
              valTitile = 'baba',
              valAuthor = 'autor';
              author.value = valAuthor;
              title.value = valTitile;
submit.click();
const h2 = document.querySelector(`div[id='0'] h2`)
const h3 = document.querySelector(`div[id='0'] h3`)
    expect(h2.textContent).toBe(valTitile);
expect(h3.textContent).toBe(valAuthor);
});

test('by clicking on button(#submit-btn) if I check #red .toggle button`s textContent is yes, else it is No',()=>{
const submit = document.getElementById('submit-btn'),
              title = document.getElementById('title'),
              author = document.getElementById('author'),
              red = document.getElementById('red');
    title.value = 'aaa';
    author.value = 'aa';
submit.click();
const button = document.querySelector(`div[id='0'] .toggle`);
expect(button.innerHTML).toBe('Yes');
title.value = 'nanna';
    author.value = 'biba';
    red.checked = false
submit.click();
const buttonTwo = document.querySelector(`div[id='0'] .toggle`);
expect(buttonTwo.innerHTML).toBe('No')
});

test('I can toggle red status of a book with specific index by clicking on (#index .toggle) button',()=>{
   
const  button = document.querySelector(`div[id='0'] .toggle`);
let previous = button.innerHTML;
button.click();
let updated = button.innerHTML;
expect(updated).not.toBe(previous);
})
test('class true or false is added to items element based on red status',()=>{
    const submit = document.getElementById('submit-btn'),
              title = document.getElementById('title'),
              author = document.getElementById('author'),
              red = document.getElementById('red');
            
    title.value = 'aaa';
    author.value = 'aa';
submit.click();
const element = document.querySelector(`.items`);
expect(element.classList.contains('true')).toBeTruthy;
expect(element.classList.contains('false')).toBeFalsy;
title.value = 'svsd';
    author.value = 'dadss';
    red.checked = false
submit.click();
const elementTwo = document.querySelector('.items')
expect(elementTwo.classList.contains('false')).toBeTruthy;
expect(element.classList.contains('true')).toBeFalsy;

})
test('I can delete book by clicking on (#index .delete) button',()=>{
     const delButton = document.querySelector(`div[id='0'] .delete`);
              
const lengthOne = container.childElementCount
delButton.click()
const lengthTwo = container.childElementCount;
const final = lengthOne - lengthTwo
expect(final).toEqual(1);
})
test('I can save changes to local storage by clicking #local button',()=>{
    local.click()
    expect(JSON.parse(localStorage.getItem('save'))).toEqual(library.getBooks())
})








