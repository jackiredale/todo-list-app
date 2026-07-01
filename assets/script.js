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
            <button onclick="editTodo(${index})" aria-label="Edit task">✎</button>
            <button onclick="deleteTodo(${index})" aria-label="Delete task">×</button>
        `;

        todoList.appendChild(li);
    });
}

function editTodo(index) {
    const updatedTodo = prompt("Edit your task:", todos[index]);

    if (updatedTodo === null) {
        return;
    }

    const trimmedTodo = updatedTodo.trim();

    if(trimmedTodo === "") {
        message.textContent = "Task cannot be empty";
        return;
    }

    todos[index] = trimmedTodo;
    message.textContent = "";
    renderTodo();
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
        