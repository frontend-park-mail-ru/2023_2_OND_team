/**
* Рендерятся пины на главной странице.
* @param {HTMLElement} parent - Родительский элемент для отображения изображений
* @param {Array} images - Массив объектов с информацией о пинах.
*/
export function renderPins(parent, images) {
  const template = Handlebars.templates['Pins.hbs'];
  images.forEach((image) => {
    const context = {src: image.picture, id: image.id};

    parent?.insertAdjacentHTML('beforeend', template(context));
  });
}
