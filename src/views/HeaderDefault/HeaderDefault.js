export function renderHeaderDefault(data) {
    const header = document.querySelector('#header');
    const headerTemplate = Handlebars.templates['HeaderDefault.hbs'];
    const headerContext = {
        username: data.username,
    }
    
    header.innerHTML = headerTemplate(headerContext);
}