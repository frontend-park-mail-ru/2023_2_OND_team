const fullscreenImage = document.getElementById('fond');

const whiteBlock = document.createElement('div');
whiteBlock.classList.add('form-container');
fullscreenImage.appendChild(whiteBlock);

const imageElement = document.createElement('img');
imageElement.src = 'static/img/image_1.png';
fullscreenImage.appendChild(imageElement);

const form = document.createElement('form');
form.classList.add('input-container');
whiteBlock.appendChild(form);

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

form.appendChild(createLabeledInput('Имя пользователя', 'text', 'Иван Иванов'));
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

function renderWelcomePage() {
    const welcomePage = document.createElement('div');
    welcomePage.textContent = 'Hello';

    fullscreenImage.innerHTML = '';

    fullscreenImage.appendChild(welcomePage);
}

signInLink.addEventListener('click', function (e) {
    e.preventDefault();

    renderWelcomePage();
});
