

export function renderProfilePage(headerElement, pageElement) {
    const profile = Handlebars.templates['Profile.hbs'];
    const context = {};

    pageElement.innerHTML = profile(context);
}