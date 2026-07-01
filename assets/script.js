const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const message = document.querySelector('#message');

let todos = [];

function renderTodo() {
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        
        li.innerHTML = `
            <span>${todo}</span>
            <button onclick="deleteTodo(${index})">Delete</button>
        `;

        todoList.appendChild(li);
    });
}

todoForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const newTodo = todoInput.value.trim();

    if(newTodo === "") {
        message.textContent = "Please enter a Task";
        return;
    }

    if(todos.includes(newTodo)) {
        message.textContent = "Task already exists";
        return;
    }

    todos.push(newTodo);
    todoInput.value = '';
    message.textContent = '';
    renderTodo();
});

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodo();
}
        