


//read tods form local storage

const getSavedTodos = function(){
    const todoJSON = localStorage.getItem('todos')

    if(todoJSON !== null){
        return JSON.parse(todoJSON)
    }else {
         return []
        }
}   
//save localstorage

const saveTodos = function (todos){
    localStorage.setItem('todos',JSON.stringify(todos))
}


// rendertodos for the applicaion


const renderTodos= function (todos, filters){
    const filteredtodos = todos.filter( function (todo) {
        const searchTextMatch= todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hidecompletedMatch = !filters.hidecompleted || !todo.completed
        
        return searchTextMatch && hidecompletedMatch
    })
    document.querySelector('#todos').innerHTML= ''
    
    
    const incompleteTodos = filteredtodos.filter(function (todo){
        return !todo.completed
    })
   
    document.querySelector('#todos').appendChild(generateSummaryDom(incompleteTodos))    
    filteredtodos.forEach(function (todo){
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))

    })
}

//remoe todo by id

const removeTodos = function (id){
    const todoIndex= todos.findIndex(function (todo){
        return todo.id ===id
    })
    if(todoIndex > -1){
        todos.splice(todoIndex,1)
    }
}
//toggle todos
const toggleTodos = function (id){
    const todo = todos.find(function(todo){
        return todo.id===id
    })
    if(todo !==undefined){
        todo.completed=!todo.completed

    }
}




//generate todo dom 
const generateTodoDOM = function(todo){
    const todoEL= document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')
    
    //setup todo checklist
    checkbox.setAttribute('type','checkbox')
    checkbox.checked=todo.completed
    todoEL.appendChild(checkbox)
    checkbox.addEventListener('change',function(){
        toggleTodos(todo.id)
        saveTodos(todos)
        renderTodos(todos,filters)
    })
    
    
    //setup todo text
    todoText.textContent=todo.text
    todoEL.appendChild(todoText)

    //setup the remove button

    removeButton.textContent='x'
    todoEL.appendChild(removeButton)
    removeButton.addEventListener('click', function(){
        removeTodos(todo.id)
        saveTodos(todos)
        renderTodos(todos,filters)

    })

    
    return todoEL
}
//get the dom element for an individuval todo
const generateSummaryDom = function(incompleteTodos){
    const summary = document.createElement('h2')
    summary.textContent= `you have ${incompleteTodos.length} todos left buddy`
    return summary
}
