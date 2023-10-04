/**
* Устанавливаются куки с указанным именем, значением и сроком действия.
* @param {string} name - Имя куки.
* @param {string} value - Значение куки.
* @param {number} days - Срок действия куки в днях.
*/
export function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

/**
* Получается значение куки по указанному имени.
* @param {string} name - Имя куки.
* @returns {string} - Значение куки или пустая строка, если кука не найдена.
*/
export function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

/**
* Удаляет куки с указанным именем.
* @param {string} name - Имя куки, которое нужно удалить.
*/
export function clearCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}
