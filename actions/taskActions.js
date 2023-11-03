export const ActionTypes = {
    ADD_TASK: 'ADD_TASK',
    DELETE_TASK: 'DELETE_TASK',
};

export function addTask(task) {
    return {
        type: ActionTypes.ADD_TASK,
        payload: task,
    };
}

export function deleteTask(id) {
    return {
        type: ActionTypes.DELETE_TASK,
        payload: id,
    };
}
