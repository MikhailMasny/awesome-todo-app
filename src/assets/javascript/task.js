/* eslint-disable no-param-reassign */
import * as constants from './constants';
import * as localStorage from './local-storage';


/* Create new task */

function createBlockTaskInfo(task) {
  const taskInfo = document.createElement('div');
  taskInfo.classList.add('task__info');

  const taskTitle = document.createElement('div');
  taskTitle.classList.add('task__title');
  taskTitle.innerText = task.text;
  taskInfo.appendChild(taskTitle);

  const taskCreation = document.createElement('div');
  taskCreation.classList.add('task__creation');

  const taskIcon = document.createElement('div');
  taskIcon.classList.add('task__icon');
  taskIcon.innerText = 'icon'; // TODO: fix it
  taskCreation.appendChild(taskIcon);

  const taskTime = document.createElement('div');
  taskTime.classList.add('task__time');
  taskTime.classList.add('task__time-indent');
  taskTime.innerText = task.date;
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

function createBlockTaskContent(task) {
  const taskContent = document.createElement('div');
  taskContent.classList.add('task__content');

  const blockTaskInfo = createBlockTaskInfo(task);
  taskContent.appendChild(blockTaskInfo);

  const blockTaskAction = createBlockTaskAction();
  taskContent.appendChild(blockTaskAction);

  return taskContent;
}

function generateTask() {
  return {
    id: Math.random().toString(36).slice(2),
    text: constants.taskInput.value,
    date: new Date().toUTCString(),
  };
}

function createTask(event) {
  event.preventDefault();
  const todoDiv = document.createElement('div');
  const task = generateTask();
  localStorage.saveTasksToLocalStorage(task);
  const blockTaskContent = createBlockTaskContent(task);
  todoDiv.appendChild(blockTaskContent);
  todoDiv.setAttribute('data-id', task.id);
  todoDiv.classList.add('task__item');
  todoDiv.classList.add('task__item-indent');
  constants.taskList.insertBefore(todoDiv, constants.taskList.firstChild);
  constants.taskInput.value = '';
}


/* Get all tasks */

function getAllTasks() {
  const tasks = localStorage.getTasksFromLocalStorage();
  if (tasks) {
    tasks.forEach((task) => {
      const todoDiv = document.createElement('div');
      todoDiv.setAttribute('data-id', task.id);
      todoDiv.classList.add('task__item');
      todoDiv.classList.add('task__item-indent');
      const blockTaskContent = createBlockTaskContent(task);
      todoDiv.appendChild(blockTaskContent);
      constants.taskList.insertBefore(todoDiv, constants.taskList.firstChild);
    });
  }
}


/* Remove and complete task */

function removeTask(element) {
  const taskAction = element.parentElement;
  const taskContent = taskAction.parentElement;
  const task = taskContent.parentElement;
  localStorage.removeTasksFromLocalStorage(task.dataset.id);
  task.remove();
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

// function filterTodo(event) {
//   const key = event.target.value;
//   const todos = constants.todoList.childNodes;
//   todos.forEach((todo) => {
//     switch (key) {
//       case 'all':
//         todo.style.display = 'flex';
//         break;
//       case 'completed':
//         if (todo.classList.contains('completed')) {
//           todo.style.display = 'flex';
//         } else {
//           todo.style.display = 'none';
//         }
//         break;

//       case 'uncompleted':
//         if (!todo.classList.contains('completed')) {
//           todo.style.display = 'flex';
//         } else {
//           todo.style.display = 'none';
//         }
//         break;

//       default:
//         break;
//     }
//   });
// }

export {
  createTask,
  getAllTasks,
  operationWithTask,
  // filterTodo,
};
