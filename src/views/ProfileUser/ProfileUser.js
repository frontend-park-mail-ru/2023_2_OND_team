import State from "../../components/State/state.js";

export function renderProfilePage() {
    const main = document.querySelector('#main');

    const state = new State();

    const profileTemplate = Handlebars.templates['ProfileUser.hbs'];
    const profileContext = {
        username: state.getUsername(),
    };

    main.innerHTML = profileTemplate(profileContext);
}
