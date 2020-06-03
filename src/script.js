import './style.scss';
import * as task from './assets/javascript/task';
import loadEvents from './assets/javascript/events';

function load() {
  task.getAllTasks();
  loadEvents();
}

document.addEventListener('DOMContentLoaded', load);
