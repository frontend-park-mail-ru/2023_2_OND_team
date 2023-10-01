import { setCookie } from '../utils/cookie.js';

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
