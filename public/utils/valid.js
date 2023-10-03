/**
 * Проверяется, является ли имя пользователя валидным.
 * @param {string} username - Введенное имя пользователя.
 * @returns {Object} - Объект с информацией о валидации, включая текст сообщения об ошибке, если есть.
 */
export function isValidUserName(username) {
    const regex = /^[a-zA-Z0-9]+$/;
    let validationResult = {
        valid: true,
        message: ''
    };

    if (username.length < 8) {
        validationResult.valid = false;
        validationResult.message = 'Имя пользователя должно содержать не менее 8 символов.';
    } else if (!regex.test(username)) {
        validationResult.valid = false;
        validationResult.message = 'Имя пользователя должно состоять только из букв латинского алфавита и цифр.';
    }

    return validationResult;
}

/**
 * Проверяется, является ли адрес электронной почты валидным.
 * @param {string} email - Введенный адрес электронной почты.
 * @returns {Object} - Объект с информацией о валидации, включая текст сообщения об ошибке, если есть.
 */
export function isValidEmail(email) {
    let validationResult = {
        valid: true,
        message: ''
    };

    if (email.length < 4) {
        validationResult.valid = false;
        validationResult.message = 'Email должен содержать не менее 4 символов.';
    } else if (!email.includes('@')) {
        validationResult.valid = false;
        validationResult.message = 'Email должен содержать символ @.';
    }

    return validationResult;
}

/**
 * Проверяется, является ли пароль валидным.
 * @param {string} password - Введенный пароль для проверки.
 * @returns {Object} - Объект с информацией о валидации, включая текст сообщения об ошибке, если есть.
 */
export function isValidPassword(password) {
    let validationResult = {
        valid: true,
        message: ''
    };

    if (password.length < 8) {
        validationResult.valid = false;
        validationResult.message = 'Пароль должен содержать не менее 8 символов.';
    } else if (!/[a-z]/.test(password)) {
        validationResult.valid = false;
        validationResult.message = 'Пароль должен содержать хотя бы одну букву в нижнем регистре.';
    } else if (!/[A-Z]/.test(password)) {
        validationResult.valid = false;
        validationResult.message = 'Пароль должен содержать хотя бы одну букву в верхнем регистре.';
    }

    return validationResult;
}
