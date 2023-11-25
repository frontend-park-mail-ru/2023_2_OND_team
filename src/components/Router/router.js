import {API} from '../../utils/api.js';
import State from '../State/state.js';
import {renderFirstQuizTemplate} from '../../views/Quiz_1/quiz_1.js';
import {renderRecQuizTemplate} from '../../views/Quiz_Rec/quiz_rec.js';
import {renderThemeQuizTemplate} from '../../views/Quiz_Theme/quiz_theme.js';

function resetScroll() {
  window.scrollTo({
    top: 0,
  });
}

export class Router {
  #routes;
  #currentRoute;
  #defaultRoute;
  #popstateListener;

  constructor() {
    if (Router.instance) {
      return Router.instance;
    }

    Router.instance = this;

    this.state = new State();

    this.#routes = [
      {
        path: '/1',
        handler: () => {
            renderFirstQuizTemplate();
        },
      },
      {
        path: '/2',
        handler: () => {
            renderRecQuizTemplate();
        },
      },
      {
        path: '/3',
        handler: () => {
            renderThemeQuizTemplate();
        },
      },
  ]}

  navigate(path) {
    window.history.pushState(null, null, path);
    this.handlePopstate();
  }

  handlePopstate() {
    const path = window.location.pathname;
    const route = this.#routes.find((r) => r.path === path);

    switch (true) {
      default:
        this.#currentRoute = route;
        route.handler();
        break;
    }
    }
}
