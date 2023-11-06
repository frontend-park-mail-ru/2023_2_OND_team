import { API } from "../../utils/api.js";
import { renderSidebar } from "../../views/Sidebar/Sidebar.js";
import { renderHeaderDefault } from "../../views/HeaderDefault/HeaderDefault.js";
import { renderFeedPage } from "../../views/Feed/Feed.js";
import { renderHeaderGuest } from "../../views/HeaderGuest/HeaderGuest.js";
import { renderProfilePage } from "../../views/ProfileUser/Profile.js";
import { renderAuthPage } from "../../views/Authorization/Authorization.js";

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
                path: "/profile",
                handler: () => {
                    API.checkLogin()
                        .then((status) => {
                            if (status === 'ok') {
                                renderProfilePage();
                            } else {
                                renderAuthPage();
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        })
                },
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

