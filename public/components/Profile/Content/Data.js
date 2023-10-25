

export function renderDataPage(headerElement, pageElement) {
    const profilePage = document.querySelector('.js-profile__page');
    
    const profileData = Handlebars.templates['ProfileData.hbs'];
    const context = {
        username: 'Pupkin',
        avatar: 'https://pinspire.online:8081/upload/pins/d7dc22616d514788b514fc2edb60920b.png',
        name: 'Василий',
        surname: 'Пупкин',
    };

    profilePage.innerHTML = profileData(context);
}
