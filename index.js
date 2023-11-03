import { TaskForm } from './view/TaskForm.js';
import { TaskList } from './view/TaskList.js';
import { FeedView } from './view/FeedView.js'

// function render() {
//     const root = document.getElementById('root');
//     root.appendChild(TaskForm());
//     root.appendChild(TaskList());
// }

function render() {
    const root = document.getElementById('root');
    root.innerHTML = FeedView();
}

render();
