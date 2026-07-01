const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const message = document.querySelector('#message');

let todos = [];

let editingIndex = null;

function renderTodo() {
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        
        if(editingIndex === index) {
            li.innerHTML = `
                <input type="text" value="${todo}" id="edit-input-${index}" />
                <button onclick="saveTodo(${index})" aria-label="Save task">💾</button>
                <button onclick="cancelEdit()" aria-label="Cancel edit">✖</button>
            `;
        } else {
            li.innerHTML = `
                <span>${todo}</span>
                <button onclick="editTodo(${index})" aria-label="Edit task">✎</button>
                <button onclick="deleteTodo(${index})" aria-label="Delete task">×</button>
            `;
        }   

        todoList.appendChild(li);
    });
}

function editTodo(index) {
    editingIndex = index;
    renderTodo();
}

function cancelEdit() {
    editingIndex = null;
    message.textContent = "";
    renderTodo();
}

function saveTodo(index) {
    const editInput = document.querySelector(`#edit-input-${index}`);
    const updatedTodo = editInput.value.trim();

    if(updatedTodo === "") {
        message.textContent = "Task cannot be empty";
        return;
    }

    if(todos.includes(updatedTodo) && updatedTodo !== todos[index]) {
        message.textContent = "Task already exists";
        return;
    }

    todos[index] = updatedTodo;
    editingIndex = null;
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
        