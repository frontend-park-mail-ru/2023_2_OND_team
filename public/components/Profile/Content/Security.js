

export function renderSecurityPage(email) {
    const profilePage = document.querySelector('.js-profile__page');

    const profileSecurity = Handlebars.templates['ProfileSecurity.hbs'];
    const context = {
        mail: email
    };

    profilePage.innerHTML = profileSecurity(context);
}
