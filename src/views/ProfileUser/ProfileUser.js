import State from "../../components/State/state.js";
import { API } from "../../utils/api.js";
import { Router } from "../../components/Router/router.js";
import { renderPins } from "../../components/RenderPins/renderPins.js";
import { renderBoards } from "../../components/RenderBoards/renderBoards.js";

export function renderProfilePage() {
    const main = document.querySelector('#main');

    const state = new State();
    const router = new Router();

    const profileTemplate = Handlebars.templates['ProfileUser.hbs'];
    const profileContext = {
        avatar: state.getAvatar(),
        username: state.getUsername(),
    };

    main.innerHTML = profileTemplate(profileContext);

    const pinsBtn = document.querySelector('.profile-user__pins-btn');
    pinsBtn?.addEventListener('click', () => {
        const activeElement = document.querySelector('.profile-user__btn-active');
        if (activeElement === pinsBtn) {
            return;
        }

        activeElement.classList.remove('profile-user__btn-active');
        pinsBtn.classList.add('profile-user__btn-active');
        
        const gallery = document.querySelector('#user-boards');
        gallery.innerHTML = '';

        renderUserPins();
    })

    const boardsBtn = document.querySelector('.profile-user__boards-btn');
    boardsBtn?.addEventListener('click', () => {
        const activeElement = document.querySelector('.profile-user__btn-active');
        if (activeElement === boardsBtn) {
            return;
        }

        activeElement.classList.remove('profile-user__btn-active');
        boardsBtn.classList.add('profile-user__btn-active');

        const gallery = document.querySelector('#user-pins');
        gallery.innerHTML = '';

        renderUserBoards();
    })

    renderUserPins();

    function renderUserPins() {
        API.getUserPins()
            .then((data) => {
                const section = document.getElementById('user-pins');
                renderPins(section, data.pins);
                definePins();
            })
            .catch((error) => {
                console.error('Ошибка при рендеринге пинов:', error);
            });
    }
    
    
    function renderUserBoards() {
        API.getUserBoards()
            .then((data) => {
                const section = document.getElementById('user-boards');
                renderBoards(section, data);
                // defineBoards();
            })
            .catch((error) => {
                console.error('Ошибка при рендеринге досок:', error);
            });
    }

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

        pins?.forEach((pin) => {
            pin.addEventListener('mouseleave', () => {
                const pinID = pin.className.split(' ')[1].split('-')[3];
                const likeField = document.querySelector(`.like-counter-${pinID}`);
                likeField.style.opacity = 0;
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
                                    likeField.style.opacity = 1;
                                })
                                .catch((error) => {
                                    console.error(error);
                                })
                        } else {
                            API.setLike(id)
                                .then((data) => {
                                    likeButton.src = '/assets/icons/like_active.svg';
                                    likeField.innerHTML = data.count_like;
                                    likeField.style.opacity = 1;
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


    function defineBoards() {
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

        pins?.forEach((pin) => {
            pin.addEventListener('mouseleave', () => {
                const pinID = pin.className.split(' ')[1].split('-')[3];
                const likeField = document.querySelector(`.like-counter-${pinID}`);
                likeField.style.opacity = 0;
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
                                    likeField.style.opacity = 1;
                                })
                                .catch((error) => {
                                    console.error(error);
                                })
                        } else {
                            API.setLike(id)
                                .then((data) => {
                                    likeButton.src = '/assets/icons/like_active.svg';
                                    likeField.innerHTML = data.count_like;
                                    likeField.style.opacity = 1;
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
