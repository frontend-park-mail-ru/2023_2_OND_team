/**
 * Рендерит страницу профиля.
 *
 * @function
 * @param {HTMLElement} headerElement - Элемент заголовка страницы.
 * @param {HTMLElement} pageElement - Элемент основной части страницы.
 * @throws {Error} Если произошла ошибка при отображении страницы профиля.
 */
export function renderProfilePage(headerElement, pageElement) {
  const profile = Handlebars.templates['Profile.hbs'];
  const context = {};

  pageElement.innerHTML = profile(context);
}
