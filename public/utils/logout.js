export async function logoutUser() {
    try {
        const response = await fetch('//pinspire.online:8080/api/v1/auth/logout', {
            method: 'DELETE',
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
