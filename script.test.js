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
    </form>`

    import {formValidator} from './formValidation'
    import {library} from './Books'
    





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





