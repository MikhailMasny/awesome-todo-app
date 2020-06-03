import * as constants from './constants';
import * as task from './task';

export default function loadEvents() {
  constants.taskButton.addEventListener('click', task.createTask);
  constants.taskList.addEventListener('click', task.operationWithTask);
  constants.filterOption.addEventListener('click', task.filterTasks);
}
