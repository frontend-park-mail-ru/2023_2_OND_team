

export function renderUserPage(headerElement, pageElement) {
    const profilePage = document.querySelector('.js-profile__page');
    
    const profileUser = Handlebars.templates['ProfileUser.hbs'];
    const context = {
        username: 'Pupkin',
        avatar: 'https://pinspire.online:8081/upload/pins/d7dc22616d514788b514fc2edb60920b.png',
    };

    profilePage.innerHTML = profileUser(context);

    const profileData = Handlebars.templates['ProfileData.hbs'];
    const profileSecurity = Handlebars.templates['ProfileSecurity.hbs'];
    
    
    const profileDataContext = {
        username: 'Pupkin',
        avatar: 'https://pinspire.online:8081/upload/pins/d7dc22616d514788b514fc2edb60920b.png',
        name: 'Василий',
        surname: 'Пупкин',
    };
    const profileSecurityContext = {    
        mail: 'pupkin@mail.ru',
    };
}
