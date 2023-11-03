import { ActionTypes } from '../actions/taskActions.js';

export function taskReducer(state = [], action) {
  switch (action.type) {
    case ActionTypes.ADD_TASK:
      return [...state, action.payload];
    case ActionTypes.DELETE_TASK:
      return state.filter(task => task.id !== action.payload);
    default:
      return state;
  }
}
