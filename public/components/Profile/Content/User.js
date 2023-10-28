

export function renderUserPage(userInfo) {
    const profilePage = document.querySelector('.js-profile__page');
    
    const profileUser = Handlebars.templates['ProfileUser.hbs'];
    const context = {
        username: userInfo.username,
        avatar: userInfo.avatar,
    };

    profilePage.innerHTML = profileUser(context);
}
