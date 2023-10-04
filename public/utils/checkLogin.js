/**
* Проверяет статус авторизации пользователя.
*
* @async
* @function
* @returns {Promise<{ isAuthorized: boolean, username: string }>} Объект с информацией о статусе авторизации и именем пользователя.
* @throws {Error} Если произошла ошибка при запросе или обработке данных.
*/
export async function checkLogin() {
    try {
        const response = await fetch('//pinspire.online:8080/api/v1/auth/login', {
            credentials: 'include',
        });
        const res = await response.json();
        let isAuthorized = false;
        let username = '';

        if (res.status === 'ok') {
            username = res.body.username;
            isAuthorized = true;
        }

        return { isAuthorized, username };

    } catch (error) {
        console.error('Ошибка при получении данных об авторизации:', error);
    }
}
