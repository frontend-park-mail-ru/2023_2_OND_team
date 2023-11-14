import State from "../../components/State/state.js";
import { API } from "../../utils/api.js";
import { Router } from "../../components/Router/router.js";

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

    const createMenu = document.querySelector('.header__create__menu');
    const createMenuBtns = document.querySelectorAll('.header__create__menu__item');
    createMenuBtns.forEach((btn) => {
        btn?.addEventListener('click', () => {
            const menuItem = btn.className.split(' ')[0].split('__')[3];
            console.log(menuItem);
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
                    const sidebarActiveElement = document.querySelector('.sidebar__menu__btn-active');
                    sidebarActiveElement.classList.remove('sidebar__menu__btn-active');
                    const sidebarProfileElement = document.querySelector('.sidebar__menu__profile');
                    sidebarProfileElement.classList.add('sidebar__menu__btn-active');
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

    const userBtn = document.querySelector('.header__user__avatar-img');
    userBtn?.addEventListener('click', () => {  
        const profileArrow = document.querySelector('.header__user__avatar-user-arrow');

        if (userMenu.classList.contains('hide')) {
            profileArrow.src = '/assets/icons/actions/icon_profile_arrow-up.svg';
        } else {
            profileArrow.src = '/assets/icons/actions/icon_profile_arrow-down.svg';
        }

        userMenu.classList.toggle('hide');
    });

    document.body.addEventListener('click', () => {
        createMenu.classList.add('hide');
        userMenu.classList.add('hide');
    })
}