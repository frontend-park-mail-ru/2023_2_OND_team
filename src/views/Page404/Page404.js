import { Router } from "../../components/Router/router.js";

export function renderPage404() {
    const router = new Router();
    
    const main = document.querySelector('#main');

    main.innerHTML = '';
  
    const page404Template = Handlebars.templates['Page404.hbs'];
    const page404Context = {};
  
    page404.innerHTML = page404Template(page404Context);

    const toMainPageBtn = document.querySelector('.page404-home-btn');
    
    toMainPageBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        page404.innerHTML = '';
        router.navigate('/');
    })
  
}
  