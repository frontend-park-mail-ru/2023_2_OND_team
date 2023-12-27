/**
* Рендерятся пины на странице пользователя
* @param {HTMLElement} parent - Родительский элемент для отображения изображений
* @param {Array} images - Массив объектов с информацией о досках
*/
export function renderBoards(parent, boards) {
  const template = Handlebars.templates['UserBoards.hbs'];
  boards.forEach((board) => {
    const pins = Array.from(board.pins).slice(0, 3);
    const context = {
      id: board.board_id,
      title: board.title,
      pins: pins,
    };

    parent?.insertAdjacentHTML('beforeend', template(context));
  });
}

export function renderSearchBoards(parent, boards) {
  const template = Handlebars.templates['UserBoards.hbs'];
  boards.forEach((board) => {
    const pins = Array.from(board.pins).slice(0, 3);
    const context = {
      id: board.BoardHeader.id,
      title: board.BoardHeader.title,
      pins: pins,
    };

    parent?.insertAdjacentHTML('beforeend', template(context));
  });
}