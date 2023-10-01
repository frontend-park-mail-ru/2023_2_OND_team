import { loginUser } from '../utils/login.js';
import { sendCookieToServer } from '../utils/cookie.js';

export function loginUser(username, password) {
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

export function sendCookieToServer() {
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
