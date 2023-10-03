export async function checkLogin() {
    // try {
    //     const response = await fetch('//pinspire.online:8080/api/v1/auth/login');
    //     const res = await response.json();
    //     let isAuthorized = false;
    //     let username = '';

    //     if (res.status === 'ok') {
    //         username = res.body.username;
    //         isAuthorized = true;
    //     }

    //     return { isAuthorized, username };

    // } catch (error) {
    //     console.error('Ошибка при получении данных об авторизации:', error);
    // }

    return {
        isAuthorized: true,
        username: 'driver_on_lips',
    };
}