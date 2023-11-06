import { API } from "../../utils/api";

export class Router {
    #routes;
    #currentRoute;
    #defaultRoute;
    #notFoundHandler;
    #popstateListener;

    constructor() {
        if (Router.instance) {
            return Router.instance;
        }

        Router.instance = this;

        this.#routes = [
            {
                path: "/",
                handler: () => {
                    API.checkLogin()
                        .then((status) => {
                            if (status === 'ok') {
                                renderSidebar();
                                renderHeaderDefault();
                                renderFeedPage();
                            } else {
                                renderHeaderGuest();
                                renderFeedPage();
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        })
                },
            },
            {
                path: "/about",
                handler: () => console.log("About Page"),
            },
            {
                path: "/contact",
                handler: () => console.log("Contact Page"),
            },
        ];

        this.#currentRoute = null;
        this.#defaultRoute = () => console.log("Default Route");
        this.#notFoundHandler = () => console.log("Page Not Found");
        this.#popstateListener = this.handlePopstate.bind(this);
        window.addEventListener("popstate", this.#popstateListener);
    }

    navigate(path) {
        window.history.pushState(null, null, path);
        this.handlePopstate();
    }

    handlePopstate() {
        const path = window.location.pathname;
        const route = this.#routes.find((r) => r.path === path);

        if (route) {
            this.#currentRoute = route;
            route.handler();
        } else if (this.#defaultRoute) {
            this.#currentRoute = null;
            this.#defaultRoute();
        } else if (this.#notFoundHandler) {
            this.#currentRoute = null;
            this.#notFoundHandler();
        }
    }
}

