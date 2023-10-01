const fullscreenImage = document.getElementById('fond');

renderAuthPage();

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

function renderAuthPage() {
    fullscreenImage.innerHTML = '';

    const ImageElement = document.createElement('img');
    ImageElement.src = 'static/img/image_2.png';
    fullscreenImage.appendChild(ImageElement);

    const whiteBlock = document.createElement('div');
    whiteBlock.classList.add('form-container');
    fullscreenImage.appendChild(whiteBlock);

    const form = document.createElement('form');
    form.classList.add('input-container');
    whiteBlock.appendChild(form);

    const usernameInput = createLabeledInput('Имя пользователя', 'text', 'username');
    const passwordInput = createLabeledInput('Пароль', 'password', '●●●●●●●●●●●●');

    form.appendChild(usernameInput);
    form.appendChild(passwordInput);

    const AuthButton = document.createElement('button');
    AuthButton.type = 'submit';
    AuthButton.textContent = 'Войти';
    form.appendChild(AuthButton);

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
        renderRegPage();
    });

    AuthButton.addEventListener('click', function (e) {
        e.preventDefault();

        const username = usernameInput.querySelector('input').value;
        const password = passwordInput.querySelector('input').value;

        loginUser(username, password);
    });
}

function renderRegPage() {
    fullscreenImage.innerHTML = '';

    const ImageElement = document.createElement('img');
    ImageElement.src = 'static/img/image_1.png';
    fullscreenImage.appendChild(ImageElement);

    const whiteBlock = document.createElement('div');
    whiteBlock.classList.add('form-container');
    fullscreenImage.appendChild(whiteBlock);

    const form = document.createElement('form');
    form.classList.add('input-container');
    whiteBlock.appendChild(form);

    const usernameInput = createLabeledInput('Имя пользователя', 'text', 'username');
    const emailInput = createLabeledInput('Почта', 'email', 'test@mail.ru');
    const passwordInput = createLabeledInput('Пароль', 'password', '●●●●●●●●●●●●');

    form.appendChild(usernameInput);
    form.appendChild(emailInput);
    form.appendChild(passwordInput);

    const RegButton = document.createElement('button');
    RegButton.type = 'submit';
    RegButton.textContent = 'Создать аккаунт';
    form.appendChild(RegButton);

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
        renderAuthPage();
    });
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

function sendCookieToServer() {
    const loggedInCookie = getCookie('loggedIn');
    fetch('/set-cookie', { 
        method: 'GET'
    })
        .then((response) => {
            if (response.ok) {
                console.log('Куки успешно отправлены на сервер');
            } else {
                console.error('Ошибка при отправке куки на сервер');
            }
        })
        .catch((error) => {
            console.error('Ошибка при выполнении запроса:', error);
        });
}

function loginUser(username, password) {
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                setCookie('loggedIn', 'true', 7);
                sendCookieToServer();
            } else {
                console.error('Ошибка входа:', data.message);
            }
        })
        .catch((error) => {
            console.error('Ошибка при выполнении запроса:', error);
        });
}
