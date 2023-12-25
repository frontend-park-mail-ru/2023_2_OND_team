import State from '../State/state.js';
import { Notifications } from '../../views/Notifications/Notifications.js';
import {renderSidebar} from '../../views/Sidebar/Sidebar.js';
import {renderHeaderDefault} from '../../views/HeaderDefault/HeaderDefault.js';
import {renderFeedPage} from '../../views/Feed/Feed.js';
import {renderHeaderGuest} from '../../views/HeaderGuest/HeaderGuest.js';
import {renderProfilePage} from '../../views/ProfileUser/ProfileUser.js';
import {renderAuthPage} from '../../views/Authorization/Authorization.js';
import {renderRegPage} from '../../views/Registration/Registration.js';
import {renderPage404} from '../../views/Page404/Page404.js';
import {renderProfileData} from '../../views/ProfileData/ProfileData.js';
import {renderProfileSecurity} from '../../views/ProfileSecurity/ProfileSecurity.js';
import {renderCreatePin} from '../../views/CreatePin/CreatePin.js';
import {renderPinPage} from '../../views/PinPage/PinPage.js';
import {renderBoardPage} from '../../views/BoardPage/BoardPage.js';
import {renderCreateBoard} from '../../views/CreateBoard/CreateBoard.js';
import {renderFavouritePage} from '../../views/Favourite/Favourite.js';
import {renderAddPins} from '../../views/AddPins/AddPins.js';
import {renderSubscriptionsPage} from '../../views/Subscriptions/Subscriptions.js';
import {setHeaderTitle, removeHeaderTitle} from '../../utils/HeaderTitleProcessing/headerTitleProcessing.js';
import {setActiveSidebarItem} from '../../utils/sidebarItemsProcessing/sidebarItemsProcessing.js';
import {renderMessengerPage, renderChatPage} from '../../views/Messenger/Messenger.js';
import {renderUserPage} from '../../views/UserPage/UserPage.js';
import {renderSearchPage} from "../../views/SearchPage/Search.js"
import { MessengerChatsMenu } from '../../views/Messenger/chatsMenu/ChatsMenu.js';

function resetScroll() {
    window.scrollTo({
        top: 0,
    });
}

function destroyMessenger() {
    if (!MessengerChatsMenu.instance) {
        return;
    }
    
    const messengerChatsMenu = new MessengerChatsMenu();
    messengerChatsMenu.activeChatId = null;
    MessengerChatsMenu.instance = null;
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
                path: "/",
                handler: () => {
                    if (this.state.getCurrentPage() === 'feed') {
                        return;
                    }

                    window.removeEventListener('scroll', window.scrollFunc);

                    this.state.deleteAllPins();

                    this.state.setCurrentPage('feed');

                    if (this.state.getIsAuthorized()) {
                        if (document.querySelector('#sidebar').innerHTML === '') {
                            renderSidebar();
                        }

                        setActiveSidebarItem('feed');

                        if (document.querySelector('#header').innerHTML === '') {
                            renderHeaderDefault();
                        } 

                        removeHeaderTitle();
                    } else {
                        renderHeaderGuest();
                    }

                    destroyMessenger();

                    renderFeedPage();
                },
            },
            {
                path: "/profile",
                handler: () => {
                    if (this.state.getCurrentPage() === 'profile') {
                        return;
                    }

                    if (this.state.getIsAuthorized()) {
                        this.state.deleteAllPins();

                        this.state.setCurrentPage('profile');

                        if (document.querySelector('#sidebar').innerHTML === '') {
                            renderSidebar();
                        }

                        setActiveSidebarItem('profile');

                        if (document.querySelector('#header').innerHTML === '') {
                            renderHeaderDefault();
                        }

                        setHeaderTitle('Мои пины и доски');
 
                        destroyMessenger();

                        renderProfilePage();
                    } else {
                        this.navigate('/login');
                    }
                },
            },
            {
                path: "/profile/data",
                handler: () => {
                    if (this.state.getIsAuthorized()) {
                        this.state.deleteAllPins();

                        this.state.setCurrentPage('profileData');

                        if (document.querySelector('#sidebar').innerHTML === '') {
                            renderSidebar();
                        }

                        setActiveSidebarItem('profile-data');

                        if (document.querySelector('#header').innerHTML === '') {
                            renderHeaderDefault();
                        } 

                        setHeaderTitle('Данные аккаунта');
                        
                        destroyMessenger();

                        renderProfileData();
                    } else {
                        this.navigate('/login');
                    }
                },
            },
            {
                path: "/profile/security",
                handler: () => {
                    if (this.state.getIsAuthorized()) {
                        this.state.setCurrentPage('profileSecurity');

                        if (document.querySelector('#sidebar').innerHTML === '') {
                            renderSidebar();
                        }
                        
                        setActiveSidebarItem('profile-security');

                        if (document.querySelector('#header').innerHTML === '') {
                            renderHeaderDefault();
                        } 

                        setHeaderTitle('Безопасность');

                        destroyMessenger();

                        renderProfileSecurity();
                    } else {
                        this.navigate('/login');
                    }
                },
            },
            {
                path: "/login",
                handler: () => {
                    if (this.state.getCurrentPage() === 'login') {
                        return;
                    }

                    if (this.state.getIsAuthorized()) {
                        this.navigate('/');
                    } else {
                        this.state.deleteAllPins();

                        this.state.setCurrentPage('login');

                        renderHeaderGuest();

                        destroyMessenger();

                        renderAuthPage();
                    }
                },
            },
            {
                path: "/signup",
                handler: () => {
                    if (this.state.getCurrentPage() === 'signup') {
                        return;
                    }

                    if (this.state.getIsAuthorized()) {
                        this.navigate('/');
                    } else {
                        this.state.setCurrentPage('signup');
                        
                        renderHeaderGuest();
                        
                        destroyMessenger();
                        
                        renderRegPage();
                    }
                },
            },
            {
                path: "/messenger",
                handler: () => {
                    if (this.state.getCurrentPage() === 'messenger') {
                        return;
                    }

                    if (this.state.getIsAuthorized()) {
                        this.state.setCurrentPage('messenger');

                        if (document.querySelector('#sidebar').innerHTML === '') {
                            renderSidebar();
                        }
                        
                        setActiveSidebarItem('messenger');

                        if (document.querySelector('#header').innerHTML === '') {
                            renderHeaderDefault();
                        } 

                        setHeaderTitle('Мессенджер');
                        
                        destroyMessenger();

                        renderMessengerPage();
                    } else {
                        this.navigate('/login');
                    }
                },
            },
            {
                path: "/subscriptions",
                handler: () => {
                    if (this.state.getCurrentPage() === 'subscriptions') {
                        return;
                    }

                    if (this.state.getIsAuthorized()) {
                        this.state.setCurrentPage('subscriptions');

                        if (document.querySelector('#sidebar').innerHTML === '') {
                            renderSidebar();
                        }
                        
                        setActiveSidebarItem('subscriptions');

                        if (document.querySelector('#header').innerHTML === '') {
                            renderHeaderDefault();
                        } 

                        setHeaderTitle('Подписки');

                        destroyMessenger();

                        renderSubscriptionsPage();
                    } else {
                        this.navigate('/login');
                    }
                },
            },
            {
                path: "/favourite",
                handler: () => {
                    if (this.state.getCurrentPage() === 'favourite') {
                        return;
                    }

                    if (this.state.getIsAuthorized()) {
                        this.state.deleteAllPins();

                        this.state.setCurrentPage('favourite');

                        if (document.querySelector('#sidebar').innerHTML === '') {
                            renderSidebar();
                        }

                        setActiveSidebarItem('favourite');

                        if (document.querySelector('#header').innerHTML === '') {
                            renderHeaderDefault();
                        } 

                        setHeaderTitle('Понравившиеся пины');

                        destroyMessenger();

                        renderFavouritePage();
                    } else {
                        this.navigate('/login');
                    }
                },
            },
            {
                path: "/create/pin",
                handler: () => {
                    if (this.state.getCurrentPage() === 'createPin') {
                        return;
                    }

                    if (this.state.getIsAuthorized) {
                        this.state.deleteAllPins();

                        this.state.setCurrentPage('createPin');

                        if (document.querySelector('#sidebar').innerHTML === '') {
                            renderSidebar();
                        }

                        setActiveSidebarItem('');

                        if (document.querySelector('#header').innerHTML === '') {
                            renderHeaderDefault();
                        } 

                        setHeaderTitle('Создание пина');

                        destroyMessenger();

                        renderCreatePin();
                    } else {
                        this.navigate('/login');
                    }
                },
            },
            {
                path: "/create/board",
                handler: () => {
                    if (this.state.getCurrentPage() === 'createBoard') {
                        return;
                    }

                    if (this.state.getIsAuthorized()) {
                        this.state.deleteAllPins();

                        this.state.setCurrentPage('createBoard');

                        if (document.querySelector('#sidebar').innerHTML === '') {
                            renderSidebar();
                        }

                        setActiveSidebarItem('');

                        if (document.querySelector('#header').innerHTML === '') {
                            renderHeaderDefault();
                        }               
                        
                        setHeaderTitle('Создание доски');

                        destroyMessenger();

                        renderCreateBoard();
                    } else {
                        this.navigate('/login');
                    }
                },
            },
            {
                path: "/create/board/ID",
                handler: ({ boardID }) => {
                    if (this.state.getCurrentPage() === `createВoard${boardID}`) {
                        return;
                    }

                    if (this.state.getIsAuthorized()) {
                        this.state.setCurrentPage(`createВoard${boardID}`);

                        if (document.querySelector('#sidebar').innerHTML === '') {
                            renderSidebar();
                        }
                        
                        setActiveSidebarItem('');
                        
                        if (document.querySelector('#header').innerHTML === '') {
                            renderHeaderDefault();
                        }

                        destroyMessenger();

                        renderAddPins(boardID);
                    } else {
                        this.navigate('/create/board');
                    }
                },
            },
            {
                path: "/pin/ID",
                handler: (pinID) => {
                    if (this.state.getCurrentPage() === `pin${pinID}`) {
                        return;
                    }
                    
                    this.state.setCurrentPage(`pin${pinID}`);

                    if (this.state.getIsAuthorized()) {
                        if (document.querySelector('#sidebar').innerHTML === '') {
                            renderSidebar();
                        }
                        if (document.querySelector('#header').innerHTML === '') {
                            renderHeaderDefault();
                        }
                    } else {
                        if (document.querySelector('#header').innerHTML === '') {
                            renderHeaderGuest();
                        }
                    }

                    resetScroll();

                    destroyMessenger();
                    
                    renderPinPage(pinID);
                },
            },
            {
                path: "/board/ID",
                handler: (boardID) => {
                    if (this.state.getCurrentPage() === `board${boardID}`) {
                        return;
                    }

                    this.state.deleteAllPins();

                    this.state.setCurrentPage(`board${boardID}`);

                    if (this.state.getIsAuthorized()) {
                        if (document.querySelector('#sidebar').innerHTML === '') {
                            renderSidebar();
                        }
                        if (document.querySelector('#header').innerHTML === '') {
                            renderHeaderDefault();
                        } 
                    } else {
                        if (document.querySelector('#header').innerHTML === '') {
                            renderHeaderGuest();
                        }
                    }

                    resetScroll();

                    destroyMessenger();

                    renderBoardPage(boardID);
                },
            },
            {
                path: "/search/pins/Input",
                handler: ({ searchInput }) => {
                    if (this.state.getCurrentPage() === `searchPins${searchInput}`) {
                        return;
                    }

                    if (this.state.getIsAuthorized()) {
                        this.state.setCurrentPage(`searchPins${searchInput}`);

                        if (document.querySelector('#sidebar').innerHTML === '') {
                            renderSidebar();
                        }

                        if (document.querySelector('#header').innerHTML === '') {
                            renderHeaderDefault();
                        } 

                        setHeaderTitle('Результат поиска');

                        destroyMessenger();

                        renderSearchPage();
                    } 
                },
            },
            {
                path: "/search/boards/Input",
                handler: ({ searchInput }) => {
                    if (this.state.getCurrentPage() === `searchBoards${searchInput}`) {
                        return;
                    }

                    if (this.state.getIsAuthorized()) {
                        this.state.setCurrentPage(`searchBoards${searchInput}`);

                        if (document.querySelector('#sidebar').innerHTML === '') {
                            renderSidebar();
                        }

                        if (document.querySelector('#header').innerHTML === '') {
                            renderHeaderDefault();
                        } 

                        setHeaderTitle('Результат поиска');

                        destroyMessenger();

                        renderSearchPage();
                    } 
                },
            },
            {
                path: "/search/users/Input",
                handler: ({ searchInput }) => {
                    if (this.state.getCurrentPage() === `searchUsers${searchInput}`) {
                        return;
                    }

                    if (this.state.getIsAuthorized()) {
                        this.state.setCurrentPage(`searchUsers${searchInput}`);

                        if (document.querySelector('#sidebar').innerHTML === '') {
                            renderSidebar();
                        }

                        if (document.querySelector('#header').innerHTML === '') {
                            renderHeaderDefault();
                        } 

                        setHeaderTitle('Результат поиска');

                        destroyMessenger();

                        renderSearchPage();
                    } 
                },
            },
            {
                path: '/user/ID',
                handler: (userID) => {
                  if (this.state.getCurrentPage() === `user${userID}`) {
                    return;
                  }
        
                  if (this.state.getUserID() == userID) {
                    this.navigate('/profile');
                    return;
                  }

                  console.log('asdf');
                
                  this.state.deleteAllPins();
        
                  this.state.setCurrentPage(`user${userID}`);
        
                  if (this.state.getIsAuthorized()) {
                    if (document.querySelector('#sidebar').innerHTML === '') {
                      renderSidebar();
                    }
                    if (document.querySelector('#header').innerHTML === '') {
                      renderHeaderDefault();
                    }
                  } else {
                    if (document.querySelector('#header').innerHTML === '') {
                      renderHeaderGuest();
                    }
                  }
        
                  destroyMessenger();

                  renderUserPage(userID);
                },
              },
              {
                path: '/messenger/ID',
                handler: (userID) => {
                  if (this.state.getIsAuthorized()) {
                    if (this.state.getCurrentPage()?.startsWith('messenger')) {

                        this.state.setCurrentPage(`messenger${userID}`);

                        const messengerChatsMenu = new MessengerChatsMenu();
                        messengerChatsMenu.openChatWithUser(userID);
                        
                        return;
                    }

        
                    if (document.querySelector('#sidebar').innerHTML === '') {
                        renderSidebar();
                    }
          
                    setActiveSidebarItem('messenger');
          
                    if (document.querySelector('#header').innerHTML === '') {
                        renderHeaderDefault();
                    }
        
                    setHeaderTitle('Мессенджер');
                    
                    this.state.setCurrentPage(`messenger${userID}`);
                    
                    renderChatPage(userID);
                  } else {
                    this.navigate('/login');
                  }
                },
              },
        ];

        this.#currentRoute = null;

        this.#defaultRoute = () => {
            if (this.state.getIsAuthorized()) {
                if (document.querySelector('#sidebar').innerHTML === '') {
                    renderSidebar();
                }

                if (document.querySelector('#header').innerHTML === '') {
                    renderHeaderDefault();
                }

                setActiveSidebarItem('');
            } else {
                if (document.querySelector('#header').innerHTML === '') {
                    renderHeaderGuest();
                }      
            }
          
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
            case (/^\/create\/board\/\d+$/).test(path): 
                const boardID = path.split('/')[3];
                this.#currentRoute = this.#routes.find((r) => r.path === "/create/board/ID");
                this.#currentRoute.handler({ boardID });
                break;
            case (/^\/search\/pins\/[a-zA-Zа-яА-ЯёЁ0-9]+$/u).test(path):
                const searchInput = decodeURIComponent(path.split('/')[3]);
                this.#currentRoute = this.#routes.find((r) => r.path === "/search/pins/Input");
                this.#currentRoute.handler({ searchInput });
                break;   
            case (/^\/search\/boards\/[a-zA-Zа-яА-ЯёЁ0-9]+$/u).test(path):
                const searchBoardInput = decodeURIComponent(path.split('/')[3]);
                this.#currentRoute = this.#routes.find((r) => r.path === "/search/boards/Input");
                this.#currentRoute.handler({ searchBoardInput });
                break;   
            case (/^\/search\/users\/[a-zA-Zа-яА-ЯёЁ0-9]+$/u).test(path):
                const searchUsersInput = decodeURIComponent(path.split('/')[3]);
                this.#currentRoute = this.#routes.find((r) => r.path === "/search/users/Input");
                this.#currentRoute.handler({ searchUsersInput });
                break;
            case (/^\/user\/\d+$/).test(path):
                this.#currentRoute = this.#routes.find((r) => r.path === '/user/ID');
                this.#currentRoute.handler(path.split('/')[2]);
                break;
            case (/^\/messenger\/\d+$/).test(path):
                this.#currentRoute = this.#routes.find((r) => r.path === '/messenger/ID');
                this.#currentRoute.handler(path.split('/')[2]);
                break;
            default:
                this.#currentRoute = null;
                this.#defaultRoute();
                break;
        }

        const notifications = new Notifications();
        notifications.defineNotifications();
    }
}
