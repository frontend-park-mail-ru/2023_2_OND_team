/**
* Выполняется запрос на вход пользователя с указанным именем и паролем.
* Если вход успешен, устанавливается куки `loggedIn` и отправляет их на сервер.
* @param {string} username - Имя пользователя.
* @param {string} password - Пароль.
*/

export async function loginUser(username, password) {
    try {
        const response = await fetch('//pinspire.online:8080/api/v1/auth/login', {
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
