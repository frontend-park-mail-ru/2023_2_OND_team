import State from "../../components/State/state.js";
import { API } from "../../utils/api.js";
import { Router } from "../../components/Router/router.js";

export function renderHeaderWithTitle(title) {
    const header = document.querySelector('#header');

    const router = new Router();    
    const state = new State();
    
    const headerTemplate = Handlebars.templates['HeaderWithTitle.hbs'];
    const headerContext = {
        username: state.getUsername(),
        avatar: state.getAvatar(),
        title,
    }

    header.innerHTML = headerTemplate(headerContext);

    const createMenu = document.querySelector('.header-with-title__create__menu');
    const createMenuBtns = document.querySelectorAll('.header-with-title__create__menu__item');
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

    const userMenu = document.querySelector('.header-with-title__user__menu');
    const userMenuBtns = document.querySelectorAll('.header-with-title__user__menu__item');
    userMenuBtns.forEach((btn) => {
        btn?.addEventListener('click', () => {
            const menuItem = btn.className.split(' ')[0].split('__')[3];
            switch (menuItem) {
                case 'profile':
                    const sidebarActiveElement = document.querySelector('.sidebar__menu__btn-active');
                    sidebarActiveElement.classList.remove('sidebar__menu__btn-active');
                    const sidebarProfileElement = document.querySelector('.sidebar__menu__profile');
                    sidebarProfileElement.classList.add('sidebar__menu__btn-active');
                    
                    const profileFields = document.querySelector('.js-sidebar__menu__profile-fields');
                    const profileArrow = document.querySelector('.sidebar__menu__profile__arrow-img');

                    profileFields.classList.remove('hide');
                    profileArrow.src = '/assets/icons/actions/icon_profile_arrow-up.svg';

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

    const profileArrow = document.querySelector('.header-with-title__user__avatar-user-arrow');

    const userBtn = document.querySelector('.header-with-title__user__avatar-img');
    userBtn?.addEventListener('click', () => {  

        if (userMenu.classList.contains('hide')) {
            profileArrow.src = '/assets/icons/actions/icon_profile_arrow-up.svg';
        } else {
            profileArrow.src = '/assets/icons/actions/icon_profile_arrow-down.svg';
        }

        userMenu.classList.toggle('hide');
    });

    document.body.addEventListener('click', (e) => {
        if (e.target !== document.querySelector('.js-create-img')) {
            createMenu.classList.add('hide');
        }
        if (e.target !== document.querySelector('.header-with-title__user__avatar-user') &&
           e.target !== document.querySelector('.header-with-title__user__avatar-user-arrow')) {
            userMenu.classList.add('hide');
            profileArrow.src = '/assets/icons/actions/icon_profile_arrow-down.svg';
        }
    })
}