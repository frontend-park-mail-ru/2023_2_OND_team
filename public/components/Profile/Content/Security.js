

export function renderSecurityPage(headerElement, pageElement) {
    const profilePage = document.querySelector('.js-profile__page');

    const profileSecurity = Handlebars.templates['ProfileSecurity.hbs'];
    const context = {
        mail: 'pupkin@mail.ru',
    };

    profilePage.innerHTML = profileSecurity(context);
}
