export function renderHeaderGuest() {
    const header = document.querySelector('#header');
    
    const headerTemplate = Handlebars.templates['HeaderGuest.hbs'];
    const headerContext = {};

    header.innerHTML = headerTemplate(headerContext);

    const loginBtn = document.querySelector('.js-header__login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            console.log('click');
        })
    }
}

