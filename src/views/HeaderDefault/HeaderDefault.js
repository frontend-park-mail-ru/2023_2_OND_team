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

    document.body.addEventListener('click', (e) => {
        if (e.target !== document.querySelector('.js-create-img')) {
            createMenu.classList.add('hide');
        }
        if (e.target !== document.querySelector('.header__user__avatar-user') &&
           e.target !== document.querySelector('.header__user__avatar-user-arrow')) {
            userMenu.classList.add('hide');
            profileArrow.src = '/assets/icons/actions/icon_profile_arrow-down.svg';
        }
    })

    const filterBtn = document.querySelector('.header__filter__img-image');
    const filterList = document.querySelector('header__filter__list');
    filterBtn?.addEventListener('click', () => {
        filterList.classList.toggle('hide');
    });
}