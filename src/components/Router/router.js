import { API } from "../../utils/api.js";
import State from "../State/state.js";
import { renderSidebar } from "../../views/Sidebar/Sidebar.js";
import { renderHeaderDefault } from "../../views/HeaderDefault/HeaderDefault.js";
import { renderFeedPage } from "../../views/Feed/Feed.js";
import { renderHeaderGuest } from "../../views/HeaderGuest/HeaderGuest.js";
import { renderProfilePage } from "../../views/ProfileUser/Profile.js";
import { renderAuthPage } from "../../views/Authorization/Authorization.js";
import { renderRegPage } from "../../views/Registration/Registration.js";
import { renderPage404 } from "../../views/Page404/page404.js";
import { renderProfileData } from "../../views/ProfileData/ProfileData.js";
import { renderProfileSecurity } from "../../views/ProfileSecurity/ProfileSecurity.js";

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
                path: "/",
                handler: () => {
                    if (this.state.getCurrentPage() === 'feed') {
                        return;
                    }

                    API.checkLogin()
                        .then((status) => {
                            window.removeEventListener('scroll', window.scrollFunc);
                            this.state.setCurrentPage('feed');
                            if (status === 'ok') {
                                if (document.querySelector('#sidebar').innerHTML === '') {
                                    renderSidebar();
                                }
                                if (document.querySelector('#header').innerHTML === '') {
                                    renderHeaderDefault();
                                } 
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
                    if (this.state.getCurrentPage() === 'profile') {
                        return;
                    }

                    API.checkLogin()
                        .then((status) => {
                            if (status === 'ok') {
                                this.state.setCurrentPage('profile');
                                if (document.querySelector('#sidebar').innerHTML === '') {
                                    renderSidebar();
                                }
                                if (document.querySelector('#header').innerHTML === '') {
                                    renderHeaderDefault();
                                } 
                                renderProfilePage();
                            } else {
                                this.state.setCurrentPage('login');
                                renderAuthPage();
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        })
                },
            },
            {
                path: "/profile/data",
                handler: () => {
                    if (this.state.getCurrentPage() === 'profileData') {
                        return;
                    }

                    API.checkLogin()
                        .then((status) => {
                            if (status === 'ok') {
                                this.state.setCurrentPage('profileData');
                                if (document.querySelector('#sidebar').innerHTML === '') {
                                    renderSidebar();
                                }
                                if (document.querySelector('#header').innerHTML === '') {
                                    renderHeaderDefault();
                                } 
                                renderProfileData();
                            } else {
                                this.state.setCurrentPage('login');
                                renderAuthPage();
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        })
                },
            },
            {
                path: "/profile/security",
                handler: () => {
                    if (this.state.getCurrentPage() === 'profileSecurity') {
                        return;
                    }

                    API.checkLogin()
                        .then((status) => {
                            if (status === 'ok') {
                                this.state.setCurrentPage('profileSecurity');
                                if (document.querySelector('#sidebar').innerHTML === '') {
                                    renderSidebar();
                                }
                                if (document.querySelector('#header').innerHTML === '') {
                                    renderHeaderDefault();
                                } 
                                renderProfileSecurity();
                            } else {
                                this.state.setCurrentPage('login');
                                renderAuthPage();
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        })
                },
            },
            {
                path: "/login",
                handler: () => {
                    if (this.state.getCurrentPage() === 'login') {
                        return;
                    }

                    this.state.setCurrentPage('login');
                    renderHeaderGuest();
                    renderAuthPage();
                },
            },
            {
                path: "/signup",
                handler: () => {
                    if (this.state.getCurrentPage() === 'signup') {
                        return;
                    }

                    this.state.setCurrentPage('signup');
                    renderHeaderGuest();
                    renderRegPage();
                },
            },
        ];

        this.#currentRoute = null;
        this.#defaultRoute = () => {
            renderPage404();
        };
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
        } else {
            this.#currentRoute = null;
            console.log("u'l never see it");
        }
    }
}

