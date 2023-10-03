/**
 * Регистрация нового пользователя с использованием указанных данных.
 * @param {string} username - Имя пользователя.
 * @param {string} email - Электронная почта пользователя.
 * @param {string} password - Пароль пользователя.
 */
import { setCookie, getCookie } from '../utils/cookie.js';

export function registerUser(username, email, password) {
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                setCookie('registered', 'true', 7);
                sendCookieToServer();
            } else {
                console.error('Ошибка регистрации:', data.message);
            }
        })
        .catch((error) => {
            console.error('Ошибка при выполнении запроса:', error);
        });
}

/**
 * Отправляются куки на сервер.
 */
export function sendCookieToServer() {
    const registeredCookie = getCookie('registered');
    fetch('/set-registered-cookie', {
        method: 'GET',
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
