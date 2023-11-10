/**
* Рендерятся пины на главной странице.
* @param {HTMLElement} parent - Родительский элемент для отображения изображений
* @param {Array} images - Массив объектов с информацией о пинах.
*/
export function renderRecPins(parent, images) {
    const template = Handlebars.templates['PinsOnBoard.hbs'];
    images.forEach((image) => {
      const context = {src: image.picture, id: image.id};
  
      parent?.insertAdjacentHTML('beforeend', template(context));
    });
}
  