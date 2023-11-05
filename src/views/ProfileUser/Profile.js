import { renderUserPage } from "./User.js";
import { renderDataPage } from "../ProfileData/Data.js";
import { renderSecurityPage } from "../ProfileSecurity/Security.js";
import { renderFeedPage } from "../Feed/Feed.js";
import { API } from "../../utils/api.js";

export function renderProfilePage() {
    const pageElement = document.getElementById('main');
    const profile = Handlebars.templates['ProfileUser.hbs'];
    const context = {};
    pageElement.innerHTML = profile(context);

}
