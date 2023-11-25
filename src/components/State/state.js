import { API } from "../../utils/api.js";
import { createIframeSurvey, renderIframeSurvey, closeIframeSurvey } from "../../views/IframeSurvey/IframeSurvey.js";

export class State {
  #csrfToken;
  #currentPage;
  #isAuthorized;
  #userID;
  #username;
  #avatar;
  #visiblePins;
  #countLikesForSurvey

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
    this.#countLikesForSurvey = 0;


    createIframeSurvey();

    setTimeout(() => renderIframeSurvey(2), 6 * 1000); // seconds

    // setTimeout(() => closeIframeSurvey(), 10 * 1000); // seconds

    window.addEventListener("message", (event) => {
      console.log(event);
      // switch (data) {
      //   case 'close':
      //     closeIframeSurvey();
      //     break;
      //   case 'send':
      //     API.sendQuizInfo(quiz_id, val_array);
      //     break;
      //   default:
      //     break;
      // }
     }, false);
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

  getSetLike(ID) {
    return this.#visiblePins.find((pin) => pin.ID === ID)?.setLike;
  }

  setLike(ID, value) {
    const pin = this.#visiblePins.find((pin) => pin.ID === ID);
    pin.setLike = value;
  }

  getCountLikes(ID) {
    return this.#visiblePins.find((pin) => pin.ID === ID)?.countLikes;
  }

  setCountLikes(ID, countLikes) {
    const pin = this.#visiblePins.find((pin) => pin.ID === ID);
    pin.countLikes = countLikes;
  }

  addLikePin(ID) {
    const nestedPinIndex = this.#visiblePins.findIndex((pin) => pin.ID === ID);
    const pin = this.#visiblePins[nestedPinIndex];
    if (pin.countLikes === null) {
      return null;
    }

    pin.countLikes += 1;
    return pin.countLikes;
  }

  removeLikePin(ID) {
    const nestedPinIndex = this.#visiblePins.findIndex((pin) => pin.ID === ID);
    const pin = this.#visiblePins[nestedPinIndex];
    if (pin.countLikes === null) {
      return null;
    }

    pin.countLikes -= 1;
    return pin.countLikes;
  }

  incrementCountLikesForSurvey() {
    this.#countLikesForSurvey++;
    if (this.#countLikesForSurvey === 3) {
      renderIframeSurvey(2);
    }
  }

  getCountLikesForSurvey() {
    return this.#countLikesForSurvey;
  }

}

export default State;
