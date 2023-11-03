import { ActionTypes } from "../actions/feedActions.js";

function gotoTopPage() {
    console.log('gtp');
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

export function feedReduser(state = [], action) {
    switch (action.type) {
        case ActionTypes.GOTO_TOP_PAGE:
            gotoTopPage();
            return state;
        default:
            return state;
    }
}