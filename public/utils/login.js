/**
 * Выполняется запрос на вход пользователя с указанным именем и паролем.
 * Если вход успешен, устанавливается куки `loggedIn` и отправляет их на сервер.
 * @param {string} username - Имя пользователя.
 * @param {string} password - Пароль.
 */
import { setCookie } from '../utils/cookie.js';

// export function loginUser(username, password) {
//     fetch('//pinspire:8080/api/v1/auth/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//         credentials: 'include',
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             if (data.status === 'ok') {
//                 console.log('login');
//                 // setCookie('loggedIn', 'true', 7);
//                 // sendCookieToServer();
//             } else {
//                 console.error('Ошибка входа:', data.message);
//             }
//         })
//         .catch((error) => {
//             console.error('Ошибка при выполнении запроса:', error);
//         });
// }

export async function loginUser(username, password) {
    try {
        const response = await fetch('//pinspire:8080/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
        })
        const res = await response.json();

        if (res.status === 'ok') {
            return true;
        }

        return false;

    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
    }
}