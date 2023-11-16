export function setActiveSidebarItem(item) {
    const activeElement = document.querySelector('.sidebar__menu__btn-active');
    activeElement.classList.remove('sidebar__menu__btn-active');

    if (!item) {
        return;
    }

    const nestedBtn = document.querySelector(`.sidebar__menu__btn sidebar__menu__${item}`);
    nestedBtn?.classList.add('sidebar__menu__btn-active');

    if (['profile', 'profile-data', 'profile-security'].includes(item)) {
        const profileFields = document.querySelector('.js-sidebar__menu__profile-fields');
        const profileArrow = document.querySelector('.sidebar__menu__profile__arrow-img');

        profileFields.classList.remove('hide');
        profileArrow.src = '/assets/icons/actions/icon_profile_arrow-up.svg';
    }
}