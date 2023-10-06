/**
* Проверяется, является ли имя пользователя валидным.
* @param {string} username - Введеное имя пользователя.
* @returns {object} - Объект с полем `valid` (true/false) и полем `message` (сообщение об ошибке, если есть).
*/
export function nameValid(username) {
    const regex = /^[a-zA-Z0-9_-]+$/;
    let validation = { valid: true, message: '' };

    if (username.length <= 4) {
        validation = { valid: false, message: 'Имя пользователя должно содержать не менее 4 символов' };
    } else if (username.length >= 50) {
        validation = { valid: false, message: 'Имя пользователя должно содержать менее 50 символов' };
    } else if (!regex.test(username)) {
        validation = { valid: false, message: 'Имя пользователя должно состоять только из букв и цифр' };
    }

    return validation;
}

/**
* Проверяется, является ли адрес электронной почты валидным.
* @param {string} email - Введенный адрес электронной почты.
* @returns {object} - Объект с полем `valid` (true/false) и полем `message` (сообщение об ошибке, если есть).
*/
export function emailValid(email) {
    let validation = { valid: true, message: '' };

    if (email.length >= 50) {
        validation = { valid: false, message: 'Email должен содержать не более 50 символов' };
    } else if (!email.includes('@')) {
        validation = { valid: false, message: 'Email должен содержать символ @' };
    } else {
        const parts = email.split('@');
        if (parts.length !== 2) {
            validation = { valid: false, message: 'Email должен содержать только один символ @' };
        } else {
            const domainParts = parts[1].split('.');
            if (domainParts.length < 2) {
                validation = { valid: false, message: 'Некорректный формат домена в email' };
            }
        }
    }

    return validation;
}

/**
* Проверяется, является ли пароль валидным.
* @param {string} password - Введенный пароль для проверки.
* @returns {object} - Объект с полем `valid` (true/false) и полем `message` (сообщение об ошибке, если есть).
*/
export function passwordValid(password) {
    let validation = { valid: true, message: '' };

    if (password.length <= 8) {
        validation = { valid: false, message: 'Пароль должен содержать не менее 8 символов' };
    } else if (password.length >= 50) {
        validation = { valid: false, message: 'Пароль должен содержать менее 50 символов' };
    } else if (!/[a-z]/.test(password)) {
        validation = { valid: false, message: 'Пароль должен содержать хотя бы одну букву в нижнем регистре' };
    } else if (!/[A-Z]/.test(password)) {
        validation = { valid: false, message: 'Пароль должен содержать хотя бы одну букву в верхнем регистре' };
    }

    return validation;
}
