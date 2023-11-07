import { State } from "../../components/State/state.js"
import { Router } from "../../components/Router/router.js";

export function renderSidebar() {
    const state = new State();
    if (!state.getIsAuthorized) {
        return;
    }

    const router = new Router();

    const sidebar = document.querySelector('#sidebar');
    const sidebarTemplate = Handlebars.templates['Sidebar.hbs'];
    
    sidebar.innerHTML = sidebarTemplate();

    const profileBtn = document.querySelector('.sidebar__menu__profile__arrow');
    profileBtn?.addEventListener('click', () => {
        const profileFields = document.querySelector('.js-sidebar__menu__profile-fields');
        const profileArrow = document.querySelector('.sidebar__menu__profile__arrow-img');

        if (profileFields.classList.contains('hide')) {
            profileArrow.src = '/assets/icons/icon_profile_arrow-up.svg';
        } else {
            profileArrow.src = '/assets/icons/icon_profile_arrow-down.svg';
        }

        profileFields.classList.toggle('hide');
    });

    const menuBtns = document.querySelectorAll('.sidebar__menu__btn');
    menuBtns.forEach((btn) => {
        btn?.addEventListener('click', (e) => {
            const profileArrow = document.querySelector('.sidebar__menu__profile__arrow-img');
            if (e.target == profileArrow) {
                return;
            }

            const menuItem = btn.className.split(' ')[1].split('__')[2]
            switch (menuItem) {
                case 'feed':
                    router.navigate('/');
                    break;
                case 'profile':
                    router.navigate('/profile');
                    break;
                case 'profile-data':
                    router.navigate('/profile/data');
                    break;
                case 'profile-security':
                    router.navigate('/profile/security');
                    break;
                default:
                    break;
            }

            const activeElement = document.querySelector('.sidebar__menu__btn-active');
            activeElement.classList.remove('sidebar__menu__btn-active');
            btn.classList.add('sidebar__menu__btn-active');
        });
    });


}
