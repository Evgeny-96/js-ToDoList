"use strict";


const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    headerButton = document.querySelector('.header-button');


const todoData = [];


const render = function () {
    todoList.textContent = '';
    todoCompleted.textContent = '';
    todoData.forEach(function (item, i) {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function () {
            item.completed = !item.completed;
            render();
        });

        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function () {
            todoData.splice(i, 1);
            render();
            if (todoData.length === 0) {
                localStorage.removeItem('myText');
            }
        });
    });
    if (todoData.length > 0) {
        localStorage.myText = JSON.stringify(todoData);
    }
};

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
    const newTodo = {
        value: headerInput.value,
        completed: false
    };
    if (newTodo.value === null || newTodo.value === '') {
        alert('Поле ввода пустое');
    } else {
        todoData.push(newTodo);
        headerInput.value = '';
    }
    render();
});

if (localStorage.getItem('myText')) {
    let json = localStorage.getItem('myText');
    json = JSON.parse(json);
    json.forEach(function(elem) {
        todoData.push(elem);
    });
} else {
    render();
}

render();