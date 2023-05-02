



test('title must torw error if value.length is less then 1',()=>{
    document.innerHTML = `<div id='jure'>sex</div> `
    const jure = document.getElementById('jure')
    
    expect(jure.innerText).toBe('sex');
})

