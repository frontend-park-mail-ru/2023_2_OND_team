const profileBtn = document.querySelector('.sidebar__menu__profile__arrow');
profileBtn?.addEventListener('click', () => {
    console.log('click')
    const profileFields = document.querySelector('.js-sidebar__menu__profile-fields');
    const profileArrow = document.querySelector('.sidebar__menu__profile__arrow-img');

    if (profileFields.classList.contains('sidebar__menu__profile-fields')) {
        profileArrow.src = 'https://pinspire.online:1443/static/svg/icon_profile_arrow-down.svg';
    } else {
        profileArrow.src = 'https://pinspire.online:1443/static/svg/icon_profile_arrow-up.svg';
    }

    profileFields.classList.toggle('sidebar__menu__profile-fields');
});

const menuBtns = document.querySelectorAll('.sidebar__menu__btn');
menuBtns.forEach((btn) => {
    btn?.addEventListener('click', (e) => {
        const profileArrow = document.querySelector('.sidebar__menu__profile__arrow-img');
        if (e.target == profileArrow) {
            return;
        }

        const activeElement = document.querySelector('.sidebar__menu__btn-active');
        activeElement.classList.remove('sidebar__menu__btn-active');
        btn.classList.add('sidebar__menu__btn-active');
    });
});
