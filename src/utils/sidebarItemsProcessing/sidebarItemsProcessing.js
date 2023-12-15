export function setActiveSidebarItem(item) {
  if (!item) {
    return;
  }

  const activeElement = document.querySelector('.sidebar__menu__btn-active');
  activeElement?.classList.remove('sidebar__menu__btn-active');

  const activeElementName = activeElement.className.split(' ')[1].split('__')[2];
  const activeIcon = document.querySelector(`.sidebar__menu__${activeElementName}__icon-img`);
  activeIcon.src = activeIcon.getAttribute('src').substring(0, activeIcon.getAttribute('src').length - 11) +
                     activeIcon.getAttribute('src').substring(activeIcon.getAttribute('src').length - 4);

  const nestedIcon = document.querySelector(`.sidebar__menu__${item}__icon-img`);
  nestedIcon.src = nestedIcon.getAttribute('src').substring(0, nestedIcon.getAttribute('src').length - 4) +
                     '-active' + nestedIcon.getAttribute('src').substring(nestedIcon.getAttribute('src').length - 4);

  const nestedBtn = document.querySelector(`.sidebar__menu__${item}`);
  nestedBtn?.classList.add('sidebar__menu__btn-active');

  if (['profile', 'profile-data', 'profile-security'].includes(item)) {
    const profileFields = document.querySelector('.js-sidebar__menu__profile-fields');
    const profileArrow = document.querySelector('.sidebar__menu__profile__arrow-img');

    profileFields.classList.remove('hide');
    profileArrow.src = '/assets/icons/actions/icon_profile_arrow-up.svg';
  }
}
