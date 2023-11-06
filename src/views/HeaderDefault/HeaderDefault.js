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
    }

    header.innerHTML = headerTemplate(headerContext);

    const createMenu = document.querySelector('.header__create__menu');
    const createMenuBtns = document.querySelectorAll('.header__create__menu__item');
    createMenuBtns.forEach((btn) => {
        btn?.addEventListener('click', () => {
            const menuItem = btn.className.split(' ')[0].split('__')[3];
            console.log(menuItem);
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
                    renderProfilePage();
                    break;
                case 'logout':
                    if (API.logoutUser()) {
                        router.navigate('/login');
                    }
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
        userMenu.classList.toggle('hide');
    });

}