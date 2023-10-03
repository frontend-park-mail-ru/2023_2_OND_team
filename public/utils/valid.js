/**
 * Проверяется, является ли имя пользователя валидным.
 * @param {string} username - Введеное имя пользователя.
 * @returns {boolean} - `true`, если имя пользователя валидно, иначе `false`.
 */
export function isValidUserName(username) {
    const regex = /^[a-zA-Z0-9]+$/;
    let nameMessage = '';

    if (username.length < 8) {
        nameMessage = 'Имя пользователя должно содержать не менее 8 символов.';
    }

    else if (!regex.test(username)) {
        nameMessage = 'Имя пользователя должно состоять только из букв латинского алфавита и цифр.';
    }

    return nameMessage;
}

/**
 * Проверяется, является ли адрес электронной почты валидным.
 * @param {string} email - Введенный адрес электронной почты.
 * @returns {boolean} - `true`, если адрес электронной почты валиден, иначе `false`.
 */
export function isValidEmail(email) {
    let emailMessage = '';

    if (email.length < 4) {
        emailMessage = 'Email должен содержать не менее 4 символов.';
    }

    else if (!email.includes('@')) {
        emailMessage = 'Email должен содержать символ @.';
    }

    return emailMessage;
}

/**
 * Проверяется, является ли пароль валидным.
 * @param {string} password - Введенный пароль для проверки.
 * @returns {boolean} - `true`, если пароль валиден, иначе `false`.
 */
export function isValidPassword(password) {
    let passMessage = '';

    if (password.length < 8) {
        passMessage = 'Пароль должен содержать не менее 8 символов';
    }

    else if (!/[a-z]/.test(password)) {
        passMessage = 'Пароль должен содержать хотя бы одну букву в нижнем регистре';
    }

    else if (!/[A-Z]/.test(password)) {
        passMessage = 'Пароль должен содержать хотя бы одну букву в верхнем регистре';
    }

    return passMessage;
}
