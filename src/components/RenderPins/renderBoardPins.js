export function renderPins(parent, images) {
    const template = Handlebars.templates['PinsOnBoard.hbs'];
    images.forEach((image) => {
      const context = {src: image.picture, id: image.id};
  
      parent?.insertAdjacentHTML('beforeend', template(context));
    });
}
