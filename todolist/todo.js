// SELECT ALL ELEMENTS
const form = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo")
const todoList = document.querySelector(".list-group")
const firstCardBody = document.querySelectorAll(".card-body")[0]
const secondCardBody = document.querySelectorAll(".card-body")[1]
const filter = document.querySelector("#filter")
const clearButton = document.querySelector("#clear-todos")

// ALL EVENT LİSTENERS
eventListeners();

function eventListeners(){

    form.addEventListener("submit" , addTodo)

    document.addEventListener("DOMContentLoaded" , loadAllTodosToUI)

    secondCardBody.addEventListener("click" , deleteTodo)

    filter.addEventListener("keyup",filterLists)
    
    clearButton.addEventListener("click" , clearAllTodos)

}
 
  



    // CLEAR ALL TODOS

    function clearAllTodos(e){
        if (confirm("Are You Sure to Clear All Todos?")){
            while (todoList.firstElementChild != null){
                todoList.removeChild(todoList.firstElementChild)
            }
            localStorage.removeItem("todos")
        }


    }

    



    // FİLTER TODOS
    function filterLists(e){
        const filterValue = e.target.value.toLowerCase()
        const listItems = document.querySelectorAll(".list-group-item")
        
        listItems.forEach(function(listItem){
            const text = listItem.textContent.toLowerCase()
            
            if (text.indexOf(filterValue)=== -1){
                // CANT FIND
                listItem.setAttribute("style" , "display : none !important")

            }
            else {
                listItem.setAttribute("style" , "display : block")
            }
        })

        
        


    }

    // DELETE TODOS AFTER CLİCK
    function deleteTodo(e){
        if(e.target.className === "fa fa-remove"){
            e.target.parentElement.parentElement.remove()
            deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
            showAlert("success" , "Deleted Succesfully...")
        }
    }
    
    // DELETE TODOS FROM STORAGE
    function deleteTodoFromStorage(deletetodo){
        let todos = getTodosFromStorage();
        todos.forEach(function(todo,index){
            if (todo === deletetodo) {
                todos.splice(index , 1); //DELETE FROM ARRAY
            }
        })

        localStorage.setItem("todos" , JSON.stringify(todos))
    }
    
        // GET TODOS AFTER PAGE LOAD
        function loadAllTodosToUI(){
            let todos = getTodosFromStorage()
            console.log(todos)
            todos.forEach(function(todo) {
                addTodoToUI(todo)
            });
        }


        // CREATE TODO
            function addTodo(e){
            const  newTodo = todoInput.value.trim();
            if(newTodo=== ""){
                showAlert("danger" , "Please , enter a value...")
            }
            else {
                addTodoToUI(newTodo);

                addTodoToStorage(newTodo)
                
                showAlert("success" , "Registration Successful...")
            }
            e.preventDefault()

        }
   

        // GET ALL TODOS FROM STORAGE
        function getTodosFromStorage(){
            let todos ;
            if(localStorage.getItem("todos")=== null){
                todos = []
            }
            else {
                todos = JSON.parse(localStorage.getItem("todos"))
            }
            return todos;
        } 

        // ADD TODOS TO STORAGE
        function addTodoToStorage(newTodo){
            let todos = getTodosFromStorage()

            todos.push(newTodo)
            
            localStorage.setItem( "todos" ,   JSON.stringify(todos))

        }
        
        
        
        //ALERT SHOW AFTER REGISTRATION
        function showAlert(type , message){
            const alert = document.createElement("div")
            alert.className = `alert alert-${type}`
            alert.innerHTML = message

            form.appendChild(alert)

        setTimeout(function()  {
                alert.remove()
        }, 1000);

   }



    // ADD TODOS TO BODY
        function addTodoToUI(newTodo){
        const listItem = document.createElement("li")
        const link = document.createElement("a")
        
        link.href="#"
        link.className="delete-item"
        link.innerHTML= "<i class ='fa fa-remove'></i>"
            
        listItem.className = "list-group-item d-flex justify-content-between"

        listItem.appendChild(document.createTextNode(newTodo))

            listItem.appendChild(link)
            todoList.appendChild(listItem)
            todoInput.value=""
        }


