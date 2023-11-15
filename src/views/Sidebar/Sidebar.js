import { State } from "../../components/State/state.js"
import { Router } from "../../components/Router/router.js";

function setHeaderTitle(title) {
    const headerSearch = document.querySelector('.header__search');
    const headerLeft = document.querySelector('.header__left');
    const headerTitle = document.querySelector('.header__title');

    headerSearch.classList.add('hide');
    headerLeft.classList.remove('hide');
    headerTitle.classList.remove('hide');

    headerTitle.innerHTML = title;
}

function removeHeaderTitle() {
    const headerSearch = document.querySelector('.header__search');
    const headerLeft = document.querySelector('.header__left');
    const headerTitle = document.querySelector('.header__title');

    headerSearch.classList.remove('hide');
    headerLeft.classList.add('hide');
    headerTitle.classList.add('hide');

    headerTitle.innerHTML = '';
}

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
            profileArrow.src = '/assets/icons/actions/icon_profile_arrow-up.svg';
        } else {
            profileArrow.src = '/assets/icons/actions/icon_profile_arrow-down.svg';
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
                    removeHeaderTitle();
                    router.navigate('/');
                    break;
                case 'subscriptions':
                    setHeaderTitle('Подписки');
                    router.navigate('/subscriptions');
                    break;
                case 'favourite':
                    router.navigate('/favourite');
                    break;
                case 'profile':
                    const profileFields = document.querySelector('.js-sidebar__menu__profile-fields');
                    const profileArrow = document.querySelector('.sidebar__menu__profile__arrow-img');

                    profileFields.classList.remove('hide');
                    profileArrow.src = '/assets/icons/actions/icon_profile_arrow-up.svg';

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

    const logo = document.querySelector('.js-sidebar__logo-img');
    logo?.addEventListener('click', handleLogoClick);

    function handleLogoClick(e) {
        e.preventDefault();

        if (state.getCurrentPage() === 'feed') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        } else {
            const activeElement = document.querySelector('.sidebar__menu__btn-active');
            const feedElement = document.querySelector('.sidebar__menu__feed');
            activeElement.classList.remove('sidebar__menu__btn-active');
            feedElement.classList.add('sidebar__menu__btn-active');
            router.navigate('/');
        }
    }
}
