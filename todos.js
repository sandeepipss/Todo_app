const todos = getSavedTodos()

const filters = {
    searchText: '',
    hidecompleted: false
}

const todoJSON = localStorage.getItem('todos')

if(todoJSON !== null){
    notes = JSON.parse(todoJSON)
}



renderTodos(todos,filters)

document.querySelector('#filter-todo').addEventListener('input', function (e){

    filters.searchText=e.target.value
    renderTodos(todos,filters)
})


    document.querySelector('#add-todos').addEventListener('submit', function(e){
    
        e.preventDefault()
         todos.push({
            id: uuidv4(),
            text: e.target.elements.newtodo.value,
            completed: false   
         })
         saveTodos(todos)
         
         renderTodos(todos, filters)
         e.target.elements.newtodo.value=''
    
    })
    

document.querySelector('#Hide-completed').addEventListener('change',function(e){
        filters.hidecompleted=e.target.checked

        renderTodos(todos,filters)

})