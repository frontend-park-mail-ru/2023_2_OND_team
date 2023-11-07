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
import { renderCreatePin } from "../../views/CreatePin/CreatePin.js";
import { renderPinPage } from "../../views/PinPage/PinPage.js";
import { renderCreateBoard } from "../../views/CreateBoard/CreateBoard.js";

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
                                this.navigate('/login');
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
                                this.navigate('/login');
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
                                this.navigate('/login');
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

                    API.checkLogin()
                        .then((status) => {
                            if (status === 'ok') {
                                window.removeEventListener('scroll', window.scrollFunc);
                                this.state.setCurrentPage('feed');
                                if (document.querySelector('#sidebar').innerHTML === '') {
                                    renderSidebar();
                                }
                                if (document.querySelector('#header').innerHTML === '') {
                                    renderHeaderDefault();
                                } 
                                renderFeedPage();
                            } else {
                                this.state.setCurrentPage('login');
                                renderHeaderGuest();
                                renderAuthPage();
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        })
                },
            },
            {
                path: "/signup",
                handler: () => {
                    if (this.state.getCurrentPage() === 'signup') {
                        return;
                    }

                    API.checkLogin()
                    .then((status) => {
                        if (status === 'ok') {
                            window.removeEventListener('scroll', window.scrollFunc);
                            this.state.setCurrentPage('feed');
                            if (document.querySelector('#sidebar').innerHTML === '') {
                                renderSidebar();
                            }
                            if (document.querySelector('#header').innerHTML === '') {
                                renderHeaderDefault();
                            } 
                            renderFeedPage();
                        } else {
                            this.state.setCurrentPage('signup');
                            renderHeaderGuest();
                            renderRegPage();
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                },
            },
            {
                path: "/create/pin",
                handler: () => {
                    if (this.state.getCurrentPage() === 'createPin') {
                        return;
                    }

                    API.checkLogin()
                        .then((status) => {
                            if (status === 'ok') {
                                this.state.setCurrentPage('createPin');
                                if (document.querySelector('#sidebar').innerHTML === '') {
                                    renderSidebar();
                                }
                                if (document.querySelector('#header').innerHTML === '') {
                                    renderHeaderDefault();
                                } 
                                renderCreatePin();
                            } else {
                                this.navigate('/login');
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        })
                },
            },
            {
                path: "/create/board",
                handler: () => {
                    if (this.state.getCurrentPage() === 'createBoard') {
                        return;
                    }

                    API.checkLogin()
                        .then((status) => {
                            if (status === 'ok') {
                                this.state.setCurrentPage('createBoard');
                                if (document.querySelector('#sidebar').innerHTML === '') {
                                    renderSidebar();
                                }
                                if (document.querySelector('#header').innerHTML === '') {
                                    renderHeaderDefault();
                                }                     
                                renderCreateBoard();
                            } else {
                                this.navigate('/login');
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        })
                },
            },
            {
                path: "/pin/ID",
                handler: (pinID) => {
                    if (this.state.getCurrentPage() === `pin${pinID}`) {
                        return;
                    }

                    API.checkLogin()
                        .then((status) => {
                            this.state.setCurrentPage(`pin${pinID}`);
                            if (status === 'ok') {
                                if (document.querySelector('#sidebar').innerHTML === '') {
                                    renderSidebar();
                                }
                                if (document.querySelector('#header').innerHTML === '') {
                                    renderHeaderDefault();
                                } 
                                renderPinPage(pinID);
                            } else {
                                renderHeaderGuest();
                                renderPinPage(pinID);
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        })
                },
            },
            {
                path: "/board/ID",
                handler: (boardID) => {
                    if (this.state.getCurrentPage() === `board${boardID}`) {
                        return;
                    }

                    API.checkLogin()
                        .then((status) => {
                            this.state.setCurrentPage(`board${boardID}`);
                            if (status === 'ok') {
                                if (document.querySelector('#sidebar').innerHTML === '') {
                                    renderSidebar();
                                }
                                if (document.querySelector('#header').innerHTML === '') {
                                    renderHeaderDefault();
                                } 
                                renderPinPage(pinID); // изменить на renderBoardPage(boardID);
                            } else {
                                renderHeaderGuest();
                                renderPinPage(pinID); // изменить на renderBoardPage(boardID);
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        })
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
        console.log(route)

        switch (true) {
            case (route !== undefined):
                this.#currentRoute = route;
                route.handler();
                break;
            case (/^\/pin\/\d+$/).test(path): 
                this.#currentRoute = this.#routes.find((r) => r.path === "/pin/ID");
                this.#currentRoute.handler(path.split('/')[2]);
                break;
            case (/^\/board\/\d+$/).test(path): 
                this.#currentRoute = this.#routes.find((r) => r.path === "/board/ID");
                this.#currentRoute.handler(path.split('/')[2]);
                break;
            default:
                this.#currentRoute = null;
                this.#defaultRoute();
                break;
        }
    }
}

