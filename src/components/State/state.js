export class State {
    #csrfToken;
    #currentPage;
    #isAuthorized;
    #userID;
    #username;
    #avatar;
    #visiblePins;
  
    constructor() {
      if (State.instance) {
        return State.instance;
      }
  
      State.instance = this;
      this.#csrfToken = null;
      this.#currentPage = null;
      this.#isAuthorized = null;
      this.#username = null;
      this.#avatar = null;
      this.#userID = null;
      this.#visiblePins = [];
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
  
    setUserID(userID) {
      this.#userID = userID;
    }
  
    getUserID() {
      return this.#userID;
    }
  
    setUsername(username) {
      this.#username = username;
    }
  
    getUsername() {
      return this.#username;
    }
  
    setAvatar(avatar) {
      this.#avatar = avatar;
    }
  
    getAvatar() {
      return this.#avatar;
    }
  
    addPin({ID, setLike, countLikes}) {
      if (this.#visiblePins.findIndex((pin) => pin.ID === ID) !== -1) {
        return false;
      }
  
      this.#visiblePins.push({
        ID,
        setLike,
        countLikes,
      });
  
      return true;
    }
  
    removePins(count) {
      this.#visiblePins.splice(0, count);
    }
  
    deleteAllPins() {
      this.#visiblePins = [];
    }
  
  }
  
  export default State;
  