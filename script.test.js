import {formValidator} from './script'



test('title must torw error if value.length is less then 1',()=>{
    expect(formValidator.validateAuthor('')).toBe('*it has to have at least two character')
})

