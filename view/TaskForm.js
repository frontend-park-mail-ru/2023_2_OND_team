import { addTask } from '../actions/taskActions.js';
import { dispatch } from '../stores/taskStore.js';

export function TaskForm() {
  function handleAddTask(event) {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const newTask = taskInput.value.trim();
    if (newTask) {
      dispatch(addTask({ id: Date.now(), title: newTask }));
      taskInput.value = '';
    }
  }

  const form = document.createElement('form');
  form.addEventListener('submit', handleAddTask);

  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'taskInput';

  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = 'Add Task';

  form.appendChild(input);
  form.appendChild(button);

  const div = document.createElement('div');
  div.appendChild(form);

  return div;
}
