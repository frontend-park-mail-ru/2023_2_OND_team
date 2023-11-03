import { feedReduser } from "../reducers/feedReducer.js";

let state = [];
const listeners = [];

export function dispatch(action) {
    state = feedReduser(state, action);
    listeners.forEach(listener => listener());
}

export function subscribe(listener) {
    listeners.push(listener);
}

export function getState() {
    return state;
}