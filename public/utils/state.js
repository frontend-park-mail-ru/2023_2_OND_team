export class State {
    constructor() {
        if (State.instance) {
            return State.instance;
        }

        State.instance = this;
        this.csrfToken = null;
        this.currentPage = null;
    }

    setCsrfToken(token) {
        this.csrfToken = token;
    }

    setCurrentPage(page) {
        this.currentPage = page;
    }

}

export default State;