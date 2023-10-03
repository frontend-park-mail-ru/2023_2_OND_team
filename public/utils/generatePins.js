/**
 * Генерирует изображения (пины) для отображения на странице.
 *
 * @async
 * @function
 * @throws {Error} Если произошла ошибка при запросе или обработке данных.
 * @returns {Promise<{ images: { picture: string }[] }>} Объект с массивом изображений.
 */
export async function generatePins() {
    try {
        const response = await fetch('//pinspire.online:8080/api/v1/pin?count=10');
        const res = await response.json();
        let images = [];

        if (res.status === 'ok') {
            images = res.body.pins;
        }

        return images;

    } catch (error) {
        console.error('Ошибка при получении пинов:', error);
    }
}
