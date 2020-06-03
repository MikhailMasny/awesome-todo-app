function getTasksFromLocalStorage() {
  const tasks = localStorage.getItem('tasks');
  if (tasks) {
    return JSON.parse(tasks);
  }
  return [];
}

function saveTasksToLocalStorage(task) {
  const tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTasksFromLocalStorage(id) {
  const tasks = getTasksFromLocalStorage();
  const task = tasks.filter((t) => t.id === id);
  tasks.splice(tasks.indexOf(task[0]), 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export {
  getTasksFromLocalStorage,
  saveTasksToLocalStorage,
  removeTasksFromLocalStorage,
};
