import './assets/images/clock.png';
import './assets/images/complete_green.png';
import './assets/images/complete.png';
import './assets/images/remove_red.png';
import './assets/images/remove.png';
import './style.scss';
import * as task from './assets/javascript/task';
import loadEvents from './assets/javascript/events';

function load() {
  task.getAllTasks(0);
  loadEvents();
}

document.addEventListener('DOMContentLoaded', load);
