import './style.scss';
import * as todo from './assets/javascript/todo';
import loadEvents from './assets/javascript/events';

function load() {
  todo.getAllTasks();
  loadEvents();
}

document.addEventListener('DOMContentLoaded', load);
