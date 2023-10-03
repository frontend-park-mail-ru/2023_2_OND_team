/**
 * Регистрирует пользователя с указанными данными.
 * Если регистрация успешна, устанавливает куки `registered` и отправляет их на сервер.
 * @param {string} username - Имя пользователя.
 * @param {string} email - Почта.
 * @param {string} password - Пароль.
 */
import { setCookie, getCookie } from '../utils/cookie.js';

// export function registerUser(username, email, password) {
//     fetch('//pinspire.online:8080/api/v1/auth/signup', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, email, password }),
//         credentials: 'include',
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             if (data.status === 'ok') {
//                 renderFeedPage()
//             } else {
//                 console.error('Ошибка регистрации:', data.message);
//             }
//         })
//         .catch((error) => {
//             console.error('Ошибка при выполнении запроса:', error);
//         });
// }

export async function registerUser(username, email, password) {
    try {
        const response = await fetch('//pinspire.online:8080/api/v1/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
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
