import { deleteTask } from '../actions/taskActions.js';
import { dispatch, getTasks, subscribe } from '../stores/taskStore.js';

export function TaskList() {
  function handleDeleteTask(id) {
    dispatch(deleteTask(id));
  }

  function render() {
    const tasks = getTasks();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task.title;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => handleDeleteTask(task.id));
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    });
  }

  subscribe(render);

  const ul = document.createElement('ul');
  ul.id = "taskList";

  const div = document.createElement('div');
  div.appendChild(ul);

  return div;
}