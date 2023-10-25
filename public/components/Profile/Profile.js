

export function renderProfilePage(headerElement, pageElement) {
    const profile = Handlebars.templates['Profile.hbs'];
    const profileUser = Handlebars.templates['ProfileUser.hbs'];
    const profileData = Handlebars.templates['ProfileData.hbs'];
    const profileSecurity = Handlebars.templates['ProfileSecurity.hbs'];

    const context = {
        ProfilePage: profileUser,
        profilePageContext: profileUserContext,
    };
    const profileUserContext = {
        username: 'Pupkin',
        avatar: 'https://pinspire.online:8081/upload/pins/d7dc22616d514788b514fc2edb60920b.png',
        media: {
            type: 'pins',
            content: null,
        },
    };
    const profileDataContext = {
        username: 'Pupkin',
        avatar: 'https://pinspire.online:8081/upload/pins/d7dc22616d514788b514fc2edb60920b.png',
        name: 'Василий',
        surname: 'Пупкин',
    };
    const profileSecurityContext = {    
        mail: 'pupkin@mail.ru',
    };

    pageElement.innerHTML = profile(context);
}