/**
 * Проверяется, является ли имя пользователя валидным.
 * @param {string} username - Введеное имя пользователя.
 * @returns {boolean} - `true`, если имя пользователя валидно, иначе `false`.
 */
export function isValidUserName(username) {
    return username.length >= 8;
}

/**
 * Проверяется, является ли адрес электронной почты валидным.
 * @param {string} email - Введенный адрес электронной почты.
 * @returns {boolean} - `true`, если адрес электронной почты валиден, иначе `false`.
 */
export function isValidEmail(email) {
    return email.length >= 4 && email.includes('@');
}

/**
 * Проверяется, является ли пароль валидным.
 * @param {string} password - Введенный пароль для проверки.
 * @returns {boolean} - `true`, если пароль валиден, иначе `false`.
 */
export function isValidPassword(password) {
    return password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password);
}
