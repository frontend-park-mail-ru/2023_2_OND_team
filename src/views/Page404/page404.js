import { Router } from "../../components/Router/router.js";

export function renderPage404() {
    const router = new Router();

    const sidebar = document.querySelector('#sidebar');
    const header = document.querySelector('#header');
    const main = document.querySelector('#main');
    const page404 = document.querySelector('#fullpage');
  
    sidebar.innerHTML = '';
    header.innerHTML = '';
    main.innerHTML = '';
  
    const page404Template = Handlebars.templates['Page404.hbs'];
    const page404Context = {};
  
    page404.innerHTML = page404Template(page404Context);

    const toMainPageBtn = document.querySelector('.js-page404__to-main-btn');
    
    toMainPageBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        page404.innerHTML = '';
        router.navigate('/');
    })
  
}
  