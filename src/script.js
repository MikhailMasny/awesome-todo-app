/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
import './style.scss';

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach((todo) => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement('button');
    completedButton.innerText = 'C';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    const trashButton = document.createElement('button');
    trashButton.innerText = 'D';
    trashButton.classList.add('delete-btn');
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
  });
}

function addTodo(event) {
  event.preventDefault();
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  saveLocalTodos(todoInput.value);

  // Create complete button
  const completedButton = document.createElement('button');
  completedButton.innerText = 'C';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  const trashButton = document.createElement('button');
  trashButton.innerText = 'D';
  trashButton.classList.add('delete-btn');
  todoDiv.appendChild(trashButton);
  todoList.appendChild(todoDiv);
}

function deleteCheck(event) {
  const item = event.target;
  if (item.classList[0] === 'delete-btn') {
    const todo = item.parentElement;
    removeLocalTodos(todo);
    todo.remove();
  }
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(event) {
  const key = event.target.value;
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (key) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;

      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;

      default:
        break;
    }
  });
}

document.addEventListener('DOMContentLoaded', getTodos);

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
