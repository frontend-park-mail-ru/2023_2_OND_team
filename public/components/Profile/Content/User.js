

export function renderUserPage(username, avatar) {
    const profilePage = document.querySelector('.js-profile__page');
    
    const profileUser = Handlebars.templates['ProfileUser.hbs'];
    const context = {
        username,
        avatar,
    };

    profilePage.innerHTML = profileUser(context);
}
