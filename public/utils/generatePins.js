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

    // return {
    //     images: [
    //         {picture: 'https://i.pinimg.com/564x/e2/43/10/e24310fe1909ec1f1de347fedc6318b0.jpg'},
    //         {picture: 'https://i.pinimg.com/564x/91/39/51/913951d97d3cc3ac5a4ecb58da2ffdf5.jpg'},
    //         {picture: 'https://i.pinimg.com/564x/32/80/5e/32805ec1935f0e4d2e4544d328512e03.jpg'},
    //         {picture: 'https://i.pinimg.com/564x/f7/f8/d4/f7f8d4200cb60af122be89a39fd45c57.jpg'},
    //         {picture: 'https://i.pinimg.com/564x/49/23/a9/4923a9a174fc87ab806121e79fda51e4.jpg'},
    //         {picture: 'https://i.pinimg.com/564x/ec/b9/ca/ecb9cae2e1f174aca65d5d369f9a71d9.jpg'},
    //         {picture: 'https://i.pinimg.com/564x/43/67/15/4367152cd5654e8e74afab54823732ef.jpg'},
    //         {picture: 'https://i.pinimg.com/564x/57/21/90/5721907848655c918c667d84defb99f8.jpg'},
    //         {picture: 'https://i.pinimg.com/564x/f8/bd/0a/f8bd0aeae74e94e12eb57b6ae3280d6c.jpg'},
    //         {picture: 'https://i.pinimg.com/564x/ff/03/1f/ff031f62ad3e9e3733ed78216064978c.jpg'},
    //         {picture: 'https://i.pinimg.com/564x/b0/17/fe/b017fea78ff90de1187b857166f12af8.jpg'},
    //         {picture: 'https://i.pinimg.com/564x/32/80/5e/32805ec1935f0e4d2e4544d328512e03.jpg'},
    //         {picture: 'https://i.pinimg.com/564x/f7/f8/d4/f7f8d4200cb60af122be89a39fd45c57.jpg'},
    //         {picture: 'https://i.pinimg.com/564x/30/da/d2/30dad2f5d5923e7a7715fe25ea590d35.jpg'},
    //         {picture: 'https://i.pinimg.com/564x/bc/07/62/bc07626808f2f1385e6d38765ff115cc.jpg'},
    //         {picture: 'https://i.pinimg.com/564x/ec/b9/ca/ecb9cae2e1f174aca65d5d369f9a71d9.jpg'},
    //         {picture: 'https://i.pinimg.com/564x/43/67/15/4367152cd5654e8e74afab54823732ef.jpg'},
    //         {picture: 'https://i.pinimg.com/564x/30/da/d2/30dad2f5d5923e7a7715fe25ea590d35.jpg'},
    //         {picture: 'https://i.pinimg.com/564x/ff/03/1f/ff031f62ad3e9e3733ed78216064978c.jpg'},
    //         {picture: 'https://i.pinimg.com/564x/b0/17/fe/b017fea78ff90de1187b857166f12af8.jpg'},
    //     ],
    // }; 
}
