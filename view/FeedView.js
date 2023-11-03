import { gotoTopPage } from "../actions/feedActions.js";
import { dispatch } from "../stores/feedStore.js";

export function FeedView() {
    function handleGotoTopPage(event) {
        event.preventDefault();
        dispatch(gotoTopPage());
    }

    function initializeComponents() {
        const logo = document.querySelector('.logo');
        logo?.addEventListener('click', handleGotoTopPage);
        document.removeEventListener('DOMContentLoaded', initializeComponents);
    }

    document.addEventListener('DOMContentLoaded', initializeComponents);

    // const feed = Handlebars.templates['Feed.hbs'];

    const feed = 
    `
        <div>
            <button class='logo'></button>
        </div>
    `;

    return feed;
}