import { API } from '../../utils/api.js';
import { renderPins } from '../../components/RenderPins/renderPins.js';
import { State } from '../../components/State/state.js'
import { Router } from '../../components/Router/router.js'
 
/**
* Рендерит главную страницу с пинами.
*/
export function renderFeedPage() {
    const router = new Router();
    const state = new State();
    const main = document.querySelector('#main');

    const numRequestedPins = 20;
    let pinMaxID = -Infinity; 
    let pinMinID = Infinity; 

    const feedTemplate = Handlebars.templates['Feed.hbs'];
    const introTemplate = Handlebars.templates['Intro.hbs'];
    const feedContext = {
        isAuthorized: !state.getIsAuthorized(),
        Intro: introTemplate,
    };

    main.innerHTML = feedTemplate(feedContext);

    /**
    * Создает функцию с задержкой для предотвращения слишком частых вызовов.
    */
    function debounce(f, ms) {
        let isCooldown = false;

        return function() {
            if (isCooldown) return;

            f.apply(this, arguments);
            isCooldown = true;

            setTimeout(() => isCooldown = false, ms);
        };
    }

    /**
    * Обработчик скролла страницы.
    * Загружает дополнительные пины при достижении нижней части страницы.
    */
    function handleScroll() {
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
    
        if (scrollY + windowHeight >= documentHeight - 1000) {
            API.generatePins(numRequestedPins, pinMaxID, pinMinID)
                .then((data) => {
                    if (data.maxID === pinMaxID && data.minID === pinMinID) {
                        window.removeEventListener('scroll', window.scrollFunc);
                        return;
                    }

                    pinMaxID = Math.max(pinMaxID, data.maxID);
                    pinMinID = Math.min(pinMinID, data.minID);

                    const section = document.getElementById('pins');
                    renderPins(section, data.pins);
                    definePins();
    
                    const pins = document.querySelectorAll('.gallery__item');
                    if (pins?.length > 100) {
                        const pinsToDelete = Array.from(pins).slice(0, 20);
                        pinsToDelete.forEach(pin => {
                            pin.remove();
                        });
                    }
    
                })
                .catch((error) => {
                    console.error('Ошибка при рендеринге пинов:', error);
                });
        }
    }
    
    const scrollFunc = debounce(handleScroll, 250);
    window.scrollFunc = scrollFunc;
    scrollFunc();
    window.removeEventListener('scroll', window.scrollFunc);
    window.addEventListener('scroll', window.scrollFunc);
    
    function definePins() {
        const pins = document.querySelectorAll('.gallery__item');
    
        pins?.forEach((pin) => {
          pin.addEventListener('click', (e) => {
            if (e.target.classList.contains('like-icon')) {
                return;
            }

            const pinID = pin.className.split(' ')[1].split('-')[3];
            router.navigate(`/pin/${pinID}`);
          });
        });

        pins?.forEach((pin) => {
            pin.addEventListener('mouseenter', () => {
                const pinID = pin.className.split(' ')[1].split('-')[3];
                const likeButton = document.querySelector(`.js-like-button-${pinID}`);
                API.getLike(pinID)
                    .then((data) => {
                        if (data.is_set) {
                            likeButton.src = '/assets/icons/like_active.svg';
                        } else {
                            likeButton.src = '/assets/icons/like.svg';
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            })
        })

        const likeButtons = document.querySelectorAll('.like-icon');
        likeButtons?.forEach((likeButton) => {
            likeButton.addEventListener('click', (element) => {
            const id = element.target.className.split(' ')[1].split('-')[3];
            const likeField = document.querySelector(`.like-counter-${id}`);
            API.getLike(id)
                .then((data) => {
                    if (data.is_set) {
                        API.deleteLike(id)
                            .then((data) => {
                                likeButton.src = '/assets/icons/like.svg';
                                likeField.innerHTML = data.count_like;
                                likeField.classList.toggle('hide');
                            })
                            .catch((error) => {
                                console.error(error);
                            })
                    } else {
                        API.setLike(id)
                            .then((data) => {
                                likeButton.src = '/assets/icons/like_active.svg';
                                likeField.innerHTML = data.count_like;
                                likeField.classList.toggle('hide');
                            })
                            .catch((error) => {
                                console.error(error);
                            })
                    }
                })
                .catch((error) => {
                    console.error(error);
                })

            });      
        });


    }
    
}
