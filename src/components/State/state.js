export class State {
    #csrfToken;
    #currentPage;
    #isAuthorized;
    #username;

    constructor() {
        if (State.instance) {
            return State.instance;
        }

        State.instance = this;
        this.#csrfToken = null;
        this.#currentPage = null;
        this.#isAuthorized = null;
        this.#username = null;
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

    setIsAuthorized(isAuthorized) {
        this.#isAuthorized = isAuthorized;
    }

    getIsAuthorized() {
        return this.#isAuthorized;
    }

    setUsername(username) {
        this.#username = username;
    }

    getUsername() {
        return this.#username;
    }
}

export default State;