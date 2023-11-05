import State from "../../components/State/state";

export function renderHeaderDefault() {
    const header = document.querySelector('#header');

    const state = new State();
    
    const headerTemplate = Handlebars.templates['HeaderDefault.hbs'];
    const headerContext = {
        username: state.getUsername(),
    }

    header.innerHTML = headerTemplate(headerContext);
}