

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

    const usernameInput = document.querySelector('#username');
    const nameInput = document.querySelector('#name');
    const surnameInput = document.querySelector('#surname');

    const editBtn = document.querySelector('.js-profile-data__edit-btn');
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            usernameInput.disabled = false;
            nameInput.disabled = false;
            surnameInput.disabled = false;
        });
    }

    const canselBtn = document.querySelector('.js-profile-data__cansel-btn');
    if (canselBtn) {
        canselBtn.addEventListener('click', () => {
            usernameInput.value = context.username;
            nameInput.value = context.name;
            surnameInput.value = context.surname;

            usernameInput.disabled = true;
            nameInput.disabled = true;
            surnameInput.disabled = true;
        });
    }
    const saveBtn = document.querySelector('.js-profile-data__save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            console.log(usernameInput.value, nameInput.value, surnameInput.value);

            usernameInput.disabled = true;
            nameInput.disabled = true;
            surnameInput.disabled = true;
        });
    }
}
