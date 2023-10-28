

export function renderSecurityPage(mail) {
    const profilePage = document.querySelector('.js-profile__page');

    const profileSecurity = Handlebars.templates['ProfileSecurity.hbs'];
    const context = {
        mail
    };

    profilePage.innerHTML = profileSecurity(context);
}
