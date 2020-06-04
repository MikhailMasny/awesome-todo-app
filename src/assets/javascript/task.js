import * as constants from './constants';
import * as localStorage from './local-storage';


/* Create new task */

function createBlockTaskInfo(task) {
  const taskInfo = document.createElement('div');
  taskInfo.classList.add('task__info');

  const taskTitle = document.createElement('div');
  taskTitle.classList.add('task__title');
  taskTitle.classList.add('task__title-indent');
  if (task.isCompleted) {
    taskTitle.classList.add('task__title-done');
  }
  taskTitle.innerText = task.text;
  taskInfo.appendChild(taskTitle);

  const taskCreation = document.createElement('div');
  taskCreation.classList.add('task__creation');

  const taskIcon = document.createElement('div');
  taskIcon.classList.add('task__icon');
  taskCreation.appendChild(taskIcon);

  const taskTime = document.createElement('div');
  taskTime.classList.add('task__time');
  taskTime.classList.add('task__time-indent');
  taskTime.innerText = task.date;
  taskCreation.appendChild(taskTime);

  taskInfo.appendChild(taskCreation);

  return taskInfo;
}

function createBlockTaskAction(task) {
  const taskAction = document.createElement('div');
  taskAction.classList.add('task__action');
  if (task.isCompleted) {
    taskAction.classList.add('task__action-done');
  }

  const taskCompleteButton = document.createElement('button');
  taskCompleteButton.classList.add('task__complete');
  if (task.isCompleted) {
    taskCompleteButton.classList.add('task__complete-disable');
  }
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

  const blockTaskAction = createBlockTaskAction(task);
  taskContent.appendChild(blockTaskAction);

  return taskContent;
}

function generateTask() {
  return {
    id: Math.random().toString(36).slice(2),
    text: constants.taskInput.value,
    date: new Date().toUTCString(),
    isCompleted: false,
  };
}

function createTask(event) {
  event.preventDefault();
  if (constants.taskInput.value.length === 0 || constants.taskInput.value.length > 35) {
    alert('The number of characters must be greater than 0 and less than 35.');
    return;
  }
  const todoDiv = document.createElement('div');
  const task = generateTask();
  localStorage.saveTasksToLocalStorage(task);
  const blockTaskContent = createBlockTaskContent(task);
  todoDiv.appendChild(blockTaskContent);
  todoDiv.setAttribute('data-id', task.id);
  todoDiv.setAttribute('data-completed', task.isCompleted);
  todoDiv.classList.add('task__item');
  todoDiv.classList.add('task__item-indent');
  constants.taskList.insertBefore(todoDiv, constants.taskList.firstChild);
  constants.taskInput.value = '';
}


/* Get all tasks */

function showTask(task) {
  const todoDiv = document.createElement('div');
  todoDiv.setAttribute('data-id', task.id);
  todoDiv.setAttribute('data-completed', task.isCompleted);
  todoDiv.classList.add('task__item');
  todoDiv.classList.add('task__item-indent');
  const blockTaskContent = createBlockTaskContent(task);
  todoDiv.appendChild(blockTaskContent);
  constants.taskList.insertBefore(todoDiv, constants.taskList.firstChild);
}

function getAllTasks(type) {
  const tasks = localStorage.getTasksFromLocalStorage();
  if (tasks) {
    constants.taskList.innerHTML = '';
    tasks.forEach((task) => {
      switch (type) {
        case 1:
          if (!task.isCompleted) {
            showTask(task);
          }
          break;

        case 2:
          if (task.isCompleted) {
            showTask(task);
          }
          break;

        default:
          showTask(task);
          break;
      }
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
  const task = taskContent.parentElement;
  task.setAttribute('data-completed', true);
  localStorage.updateTasksFromLocalStorage(task.dataset.id);
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

function convertSelectedFilter(key) {
  let type;
  switch (key) {
    case 'completed':
      type = 2;
      break;

    case 'uncompleted':
      type = 1;
      break;

    default:
      type = 0;
      break;
  }
  return type;
}

function filterTasks(event) {
  const key = event.target.value;
  const type = convertSelectedFilter(key);
  getAllTasks(type);
}


/* Export */

export {
  createTask,
  getAllTasks,
  operationWithTask,
  filterTasks,
};
