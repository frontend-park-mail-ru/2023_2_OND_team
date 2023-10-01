import {Header, HEADER_RENDER_TYPES} from './components/Header/Header.js';

const rootElement = document.querySelector('#root');
const headerElement = document.createElement('header');
const pageElement = document.createElement('main');
rootElement.appendChild(headerElement);
rootElement.appendChild(pageElement);


const config = {
    header: {
        feed: {
            href: '/feed',
            name: 'Лента',
            render: renderFeed,
        },
        profile: {
            href: '/me',
            name: 'Профиль',
            render: renderProfile
        },
        login: {
            href: '/login',
            name: 'Авторизоваться',
            render: renderLogin,
        },
        signup: {
            href: '/signup',
            name: 'Зарегистрироваться',
            render: renderSignup,

        },
        logout: {
            href: '/logout',
            name: 'Выйти',
            render: renderLogout
        },
        
    }
};


function createLabeledInput(labelText, inputType, inputPlaceholder) {
    const label = document.createElement('label');
    label.textContent = labelText;

    const input = document.createElement('input');
    input.type = inputType;
    input.placeholder = inputPlaceholder;

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('labeled-input');
    inputContainer.appendChild(label);
    inputContainer.appendChild(input);

    return inputContainer;
}

function renderProfile() {
    console.log("Here will be the profile")

    header.state.activeElement = header.state.headerElements.profile

    goToPage(header.state.headerElements.feed);
}

function renderLogin() {

    const div = document.createElement('div');

    const ImageElement = document.createElement('img');
    ImageElement.src = 'static/img/image_2.png';
    div.appendChild(ImageElement);

    const whiteBlock = document.createElement('div');
    whiteBlock.classList.add('form-container');
    div.appendChild(whiteBlock);

    const form = document.createElement('form');
    form.classList.add('input-container');
    whiteBlock.appendChild(form);

    form.appendChild(createLabeledInput('Имя пользователя', 'text', 'username'));
    form.appendChild(createLabeledInput('Пароль', 'password', '●●●●●●●●●●●●'));

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Войти';
    form.appendChild(submitButton);

    const textContainer = document.createElement('p');

    const alreadyHaveAccountText = document.createTextNode('Все еще нет аккаунта? ');

    const signUpLink = document.createElement('a');
    signUpLink.href = '#';
    signUpLink.textContent = 'Регистрация';

    textContainer.appendChild(alreadyHaveAccountText);
    textContainer.appendChild(signUpLink);

    form.appendChild(textContainer);

    signUpLink.addEventListener('click', function (e) {
        e.preventDefault();
        goToPage(header.state.headerElements.signup);
    });

    header.state.activeElement = header.state.headerElements.login

    return form;
}

function renderLogout() {
    console.log("Now you are a guest")

    header.state.activeElement = header.state.headerElements.logout

    goToPage(header.state.headerElements.login);
}


function renderSignup() {
    const div = document.createElement('div');

    const ImageElement = document.createElement('img');
    ImageElement.src = 'static/img/image_1.png';
    div.appendChild(ImageElement);

    const whiteBlock = document.createElement('div');
    whiteBlock.classList.add('form-container');
    div.appendChild(whiteBlock);

    const form = document.createElement('form');
    form.classList.add('input-container');
    whiteBlock.appendChild(form);

    form.appendChild(createLabeledInput('Имя пользователя', 'text', 'username'));
    form.appendChild(createLabeledInput('Почта', 'email', 'test@mail.ru'));
    form.appendChild(createLabeledInput('Пароль', 'password', '●●●●●●●●●●●●'));

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Создать аккаунт';
    form.appendChild(submitButton);

    const textContainer = document.createElement('p');

    const alreadyHaveAccountText = document.createTextNode('Уже есть аккаунт? ');

    const signInLink = document.createElement('a');
    signInLink.href = '#';
    signInLink.textContent = 'Войти';

    textContainer.appendChild(alreadyHaveAccountText);
    textContainer.appendChild(signInLink);

    form.appendChild(textContainer);

    signInLink.addEventListener('click', function (e) {
        e.preventDefault();
        goToPage(header.state.headerElements.login);
    });

    header.state.activeElement = header.state.headerElements.signup

    return form;
}


function renderFeed() {
    const feedElement = document.createElement('div');
    
    Ajax.get({
        url: '/feed',
        callback: (status, responseString) => {
            let isAuthorized = false;

            const parsedData = JSON.parse(responseString);
            const images = parsedData[0].images;
            const username = parsedData[0].name;

            if (status === 200) {
                isAuthorized = true;
                header.state.username = username
                header.render(HEADER_RENDER_TYPES.AUTHORIZED)
                header.state.activeElement = header.state.headerElements.feed
            }
            
            if (!isAuthorized) {
                header.render(HEADER_RENDER_TYPES.NOT_AUTHORIZED)
                header.state.activeElement = header.state.headerElements.feed
            }
            

            if (images && Array.isArray(images)) {
                const div = document.createElement('div');
                div.classList.add('feed')
                feedElement.appendChild(div);
                
                const section = document.createElement('section');
                section.id = "pins"
                div.appendChild(section)

                images.forEach(({src, likes}) => {
                    section.innerHTML += `
                        <div class="feed-image">
                            <img src="${src}" width="400" />
                            <!--  <div>${likes} лайков</div> -->
                        </div>
                    `;
                });
            }
        }
    })

    return feedElement;
}

function goToPage(headerLink) {
    headerElement.innerHTML = '';
    pageElement.innerHTML = '';

    const el = config.header[headerLink.dataset.section].render();

    pageElement.appendChild(el);
}


const header = new Header(headerElement, config.header);
goToPage(header.state.headerElements.feed)


// добавить обработку при нажатии на лого
headerElement.addEventListener('click', (e) => {
    const { target } = e;

    if (target.tagName.toLocaleUpperCase() === 'A' || target.tagName.toLocaleUpperCase() === 'IMG') {
        e.preventDefault();
        if (header.state.activeElement == target) return;

        Ajax.get({
            url: '/',
            callback: (status) => {
                if (status === 200) {
                }
            }
        });

       goToPage(e.target);
    }
});
