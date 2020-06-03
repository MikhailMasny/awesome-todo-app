/* eslint-disable no-param-reassign */
import * as constants from './constants';
import * as localStorage from './localStorage';


/* Create new task */

function createBlockTaskInfo(taskTitleText) {
  const taskInfo = document.createElement('div');
  taskInfo.classList.add('task__info');

  const taskTitle = document.createElement('div');
  taskTitle.classList.add('task__title');
  taskTitle.innerText = taskTitleText;
  taskInfo.appendChild(taskTitle);

  const taskCreation = document.createElement('div');
  taskCreation.classList.add('task__creation');

  const taskIcon = document.createElement('div');
  taskIcon.classList.add('task__icon');
  taskIcon.innerText = 'icon';
  taskCreation.appendChild(taskIcon);

  const taskTime = document.createElement('div');
  taskTime.classList.add('task__time');
  taskTime.classList.add('task__time-indent');
  taskTime.innerText = new Date().toUTCString();
  taskCreation.appendChild(taskTime);

  taskInfo.appendChild(taskCreation);

  return taskInfo;
}

function createBlockTaskAction() {
  const taskAction = document.createElement('div');
  taskAction.classList.add('task__action');

  const taskCompleteButton = document.createElement('button');
  taskCompleteButton.classList.add('task__complete');
  taskAction.appendChild(taskCompleteButton);

  const taskRemoveButton = document.createElement('button');
  taskRemoveButton.classList.add('task__remove');
  taskAction.appendChild(taskRemoveButton);

  return taskAction;
}

function createBlockTaskContent(titleText) {
  const taskContent = document.createElement('div');
  taskContent.classList.add('task__content');

  const blockTaskInfo = createBlockTaskInfo(titleText);
  taskContent.appendChild(blockTaskInfo);

  const blockTaskAction = createBlockTaskAction();
  taskContent.appendChild(blockTaskAction);

  return taskContent;
}

function createTask(event) {
  event.preventDefault();
  localStorage.saveLocalTodos(constants.todoInput.value);

  const todoDiv = document.createElement('div');
  todoDiv.classList.add('task__item');
  todoDiv.classList.add('task__item-indent');
  const blockTaskContent = createBlockTaskContent(constants.todoInput.value);
  todoDiv.appendChild(blockTaskContent);
  todoDiv.setAttribute('data-test', 'Hello World!');
  constants.todoList.insertBefore(todoDiv, constants.todoList.firstChild);
  constants.todoInput.value = '';
}


/* Get all tasks */

function getAllTasks() {
  const localStorageTasks = localStorage.getLocalTodos();
  if (localStorageTasks) {
    const tasks = JSON.parse(localStorageTasks);
    tasks.forEach((task) => {
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('task__item');
      todoDiv.classList.add('task__item-indent');
      const blockTaskContent = createBlockTaskContent(task);
      todoDiv.appendChild(blockTaskContent);
      constants.todoList.appendChild(todoDiv);
    });
  }
}


/* Remove and complete task */

function removeTask(element) {
  // const task = element.parentElement;
  // localStorage.removeLocalTodos(task);

  const taskAction = element.parentElement;
  const taskContent = taskAction.parentElement;
  const task = taskContent.parentElement;
  task.remove();
  console.log(task);
}

function completeTask(element) {
  const taskAction = element.parentElement;
  const taskContent = taskAction.parentElement;
  const taskTitle = taskContent.querySelector('.task__title');
  taskTitle.classList.add('task__title-done');
  const completeButton = taskContent.querySelector('.task__complete');
  completeButton.classList.add('task__complete-disable');
  taskAction.classList.add('task__action-done');
}

function operationWithTask(event) {
  const taskButon = event.target;
  if (taskButon.classList[0] === 'task__remove') {
    removeTask(taskButon);
  }

  if (taskButon.classList[0] === 'task__complete') {
    completeTask(taskButon);
  }
}


/* Filter */

function filterTodo(event) {
  const key = event.target.value;
  const todos = constants.todoList.childNodes;
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

export {
  createTask,
  getAllTasks,
  operationWithTask,

  filterTodo,
};
