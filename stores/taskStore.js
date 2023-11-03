import { taskReducer } from '../reducers/taskReducer.js';

let state = [];
const listeners = [];

export function dispatch(action) {
  state = taskReducer(state, action);
  listeners.forEach(listener => listener());
}

export function subscribe(listener) {
  listeners.push(listener);
}

export function getTasks() {
  return state;
}
