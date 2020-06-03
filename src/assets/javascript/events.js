import * as constants from './constants';
import * as todo from './todo';

export default function loadEvents() {
  constants.todoButton.addEventListener('click', todo.createTask);
  constants.todoList.addEventListener('click', todo.operationWithTask);
  // constants.filterOption.addEventListener('click', todo.filterTodo);
}
