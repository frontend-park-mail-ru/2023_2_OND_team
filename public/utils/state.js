export class State {
    #csrfToken;
    #currentPage;

    constructor() {
        if (State.instance) {
            return State.instance;
        }

        State.instance = this;
        this.#csrfToken = null;
        this.#currentPage = null;
    }

    setCsrfToken(token) {
        this.#csrfToken = token;
    }

    getCsrfToken() {
        return this.#csrfToken;
    }

    setCurrentPage(page) {
        this.#currentPage = page;
    }

    getCurrentPage() {
        return this.#currentPage;
    }

}

export default State;
