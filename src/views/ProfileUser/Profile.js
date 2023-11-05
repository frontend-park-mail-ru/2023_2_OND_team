import { renderUserPage } from "./User.js";
import { renderDataPage } from "../ProfileData/Data.js";
import { renderSecurityPage } from "../ProfileSecurity/Security.js";
import { renderFeedPage } from "../Feed/Feed.js";
import { API } from "../../utils/api.js";

export function renderProfilePage() {
    const main = document.querySelector('#main');
    const profileTemplate = Handlebars.templates['ProfileUser.hbs'];
    const profileContext = {};

    main.innerHTML = profileTemplate(profileContext);
}
