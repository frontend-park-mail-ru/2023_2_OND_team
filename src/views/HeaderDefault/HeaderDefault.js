import State from '../../components/State/state.js';
import {API} from '../../utils/Api/api.js';
import {Router} from '../../components/Router/router.js';
import { renderPins } from "../../components/RenderPins/renderPins.js";
import { renderBoards } from "../../components/RenderBoards/renderBoards.js";
import { definePins } from '../../utils/definePins/definePins.js';
import { renderUserItems } from '../Subscriptions/SubscriptionsUserItem.js';

export function renderHeaderDefault() {
    const header = document.querySelector('#header');

    const router = new Router();    
    const state = new State();
    
    const headerTemplate = Handlebars.templates['HeaderDefault.hbs'];
    const headerContext = {
        username: state.getUsername(),
        avatar: state.getAvatar(),
    }

    header.innerHTML = headerTemplate(headerContext);

    const notificationsMenu = document.querySelector('.header__notifications__menu');

    const createMenu = document.querySelector('.header__create__menu');
    const createMenuBtns = document.querySelectorAll('.header__create__menu__item');
    createMenuBtns.forEach((btn) => {
        btn?.addEventListener('click', () => {
            const menuItem = btn.className.split(' ')[0].split('__')[3];
            switch (menuItem) {
                case 'pin':
                    router.navigate('/create/pin');
                    break;
                case 'board':
                    router.navigate('/create/board');
                    break;
                default:
                    break;
            }
        })
    });

    const userMenu = document.querySelector('.header__user__menu');
    const userMenuBtns = document.querySelectorAll('.header__user__menu__item');
    userMenuBtns.forEach((btn) => {
        btn?.addEventListener('click', () => {
            const menuItem = btn.className.split(' ')[0].split('__')[3];
            switch (menuItem) {
                case 'profile':
                    router.navigate('/profile');
                    break;
                case 'logout':
                    API.logoutUser()
                        .then((status) => {
                            if (status === 'ok') {
                                router.navigate('/login');
                            } else {
                                console.log('error logout');
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        })
                    break;
                default:
                    break;
            }
        })
    });

    const createBtn = document.querySelector('.js-create-img');
    createBtn?.addEventListener('click', () => {
        createMenu.classList.toggle('hide');
    });

    const notificationsBtn = document.querySelector('.js-notification-img');
    notificationsBtn?.addEventListener('click', () => {
        notificationsMenu.classList.toggle('hide');
    });

    const profileArrow = document.querySelector('.header__user__avatar-user-arrow');

    const userBtn = document.querySelector('.header__user__avatar-img');
    userBtn?.addEventListener('click', () => {  

        if (userMenu.classList.contains('hide')) {
            profileArrow.src = '/assets/icons/actions/icon_profile_arrow-up.svg';
        } else {
            profileArrow.src = '/assets/icons/actions/icon_profile_arrow-down.svg';
        }

        userMenu.classList.toggle('hide');
    });

    let searchMode = 'pins';
    let searchInput = '';

    const radioInputs = document.querySelectorAll('.filter__list__pointer input[type="radio"]');
    radioInputs.forEach(input => {
        input.addEventListener('change', (event) => {
            if (event.target.checked) {
                searchMode = event.target.value;
                console.log('Выбран режим поиска:', searchMode);
            }
        });
    });

    const inputField = document.querySelector('.header__search__text-input');
    inputField.addEventListener('input', (event) => {
        searchInput = event.target.value;
        console.log('Новое значение поиска:', searchInput);
    });

    const searchImage = document.querySelector('.header__search__img-image');
    searchImage.addEventListener('click', () => {
        if (searchMode == 'pins' && searchInput) {
            const encodedInput = encodeURIComponent(searchInput);
            API.Search(searchMode, encodedInput)
                .then((res) => {
                    console.log('Результат поиска:', res);
                    router.navigate(`/search/pins/${encodedInput}`);
                    const searchResSection = document.getElementById('search-res');
                    const searchNonContent = document.querySelector('.search-non-content');
                    if (res && res.length > 0) {
                        renderPins(searchResSection, res);
                        definePins();
                        searchNonContent.classList.add('hide');
                    } else {
                        searchNonContent.classList.remove('hide');
                    }
                })
                .catch((error) => {
                    console.error('Ошибка при выполнении поиска:', error);
                });
        } else if (searchMode == 'boards' && searchInput) {
            API.Search(searchMode, searchInput)
                .then((res) => {
                    console.log('Результат поиска:', res);
                    router.navigate(`search/boards/${searchInput}`);
                    const searchResSection = document.getElementById('search-res');
                    const searchNonContent = document.querySelector('.search-non-content');
                    if (res && res.length > 0) {
                        renderBoards(searchResSection, res);
                        searchNonContent.classList.add('hide');
                        defineBoards();
                    } else {
                        searchNonContent.classList.remove('hide');
                    }
                })
                .catch((error) => {
                    console.error('Ошибка при выполнении поиска:', error);
                });
        } else if (searchMode == 'users' && searchInput) {
            API.Search(searchMode, searchInput)
                .then((res) => {
                    console.log('Результат поиска:', res);
                    router.navigate(`search/users/${searchInput}`);
                    const searchResSection = document.getElementById('search-res');
                    const searchNonContent = document.querySelector('.search-non-content');
                    if (res && res.length > 0) {
                        renderUserItems(searchResSection, res);
                        defineUserItems();
                        searchNonContent.classList.add('hide');
                    } else {
                        searchNonContent.classList.remove('hide');
                    }
                })
                .catch((error) => {
                    console.error('Ошибка при выполнении поиска:', error);
                });
        } else {
            console.log('Выберите режим и введите текст для поиска');
        }
    });

    const filterBtn = document.querySelector('.header__filter__img-image');
    const filterList = document.querySelector('.header__filter__list');
    filterBtn?.addEventListener('click', () => {
        filterList.classList.toggle('hide');
    });

    document.body.addEventListener('click', (e) => {
        if (e.target !== createBtn) {
            createMenu.classList.add('hide');
        }
        if (!document.querySelector('.header__notifications__menu').contains(e.target) && 
            !e.target.matches('.header__notifications__menu_item-btn') &&
            e.target !== notificationsBtn) {
            notificationsMenu.classList.add('hide');
        }
        if (e.target !== document.querySelector('.header__user__avatar-user') &&
            e.target !== document.querySelector('.header__user__avatar-user-arrow')) {
            userMenu.classList.add('hide');
            profileArrow.src = '/assets/icons/actions/icon_profile_arrow-down.svg';
        }
        if (!e.target.closest('.header__filter__list') && !e.target.classList.contains('header__filter__img-image')) {
            filterList.classList.add('hide');
        }
    })

    function defineBoards() {
        const boards = document.querySelectorAll('.user__board');
    
        boards?.forEach((board) => {
            board.addEventListener('click', (e) => {

            const boardID = board.className.split(' ')[1].split('-')[3];
            router.navigate(`/board/${boardID}`);
          });
        });
    }

    function defineUserItems() {
        const router = new Router();
        const userItems = document.querySelectorAll('.subscriptions__items');
      
        userItems?.forEach((userItem) => {
          userItem.addEventListener('click', () => {
            const userID = userItem.getAttribute('class').split(' ')[1].split('-')[1];
            router.navigate(`/user/${userID}`);
          });
        });
    }


    const searchTextInput = document.querySelector('.header__search__text-input');
    if (window.innerWidth < 700) {
        searchTextInput.placeholder = '';
    }
}
