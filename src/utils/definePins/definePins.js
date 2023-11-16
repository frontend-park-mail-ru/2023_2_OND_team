import State from "../../components/State/state.js";
import { API } from "../api.js";
import { Router } from "../../components/Router/router.js";


export function definePins() {
    const state = new State();
    const router = new Router();

    const pins = document.querySelectorAll('.gallery__item');

    if (state.getIsAuthorized()) {
        pins.forEach((pin) => {
            const pinID = pin.className.split(' ')[1].split('-')[3];
            
            const pinEssence = {
                ID: pinID,
                setLike: null,
                countLikes: null,
            }
            
            const likeField = document.querySelector(`.like-counter-${pinEssence.ID}`);
            const likeButton = document.querySelector(`.js-like-button-${pinEssence.ID}`);
            
            if (!state.addPin(pinEssence)) {
                return;
            }

            pin.addEventListener('click', (e) => {
                if (e.target.classList.contains('like-icon')) {
                    return;
                }
                
                state.deleteAllPins();
                router.navigate(`/pin/${pinEssence.ID}`);
            });

            pin.addEventListener('mouseenter', () => {
                const setLike = state.getSetLike(pinEssence.ID);
                if (setLike !== null) {
                    if (setLike === true) {
                        likeButton.src = '/assets/icons/like_active.svg';
                    } else if (setLike === false) {
                        likeButton.src = '/assets/icons/like.svg';
                    }
                } else {
                    API.getLike(pinEssence.ID)
                        .then((data) => {
                            state.setLike(pinEssence.ID, data.is_set);
                            if (data.is_set) {
                                likeButton.src = '/assets/icons/like_active.svg';
                            } else {
                                likeButton.src = '/assets/icons/like.svg';
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        })
                }

                const countLikes = state.getCountLikes(pinEssence.ID);
                if (countLikes !== null) {
                    likeField.innerHTML = countLikes;
                    likeField.style.opacity = 1;
                }
            });

            pin.addEventListener('mouseleave', () => {
                likeField.style.opacity = 0;                   
            });

            likeButton.addEventListener('click', () => {
                const setLike = state.getSetLike(pinEssence.ID);
                if (setLike !== null) {
                    if (setLike === true) {
                        likeButton.src = '/assets/icons/like.svg';

                        const countLikes = state.removeLikePin(pinEssence.ID);
                        if (countLikes !== null) {
                            likeField.innerHTML = countLikes;
                            likeField.style.opacity = 1;
                        }

                        API.deleteLike(pinEssence.ID)
                            .then((data) => {
                                state.setLike(pinEssence.ID, false);
                                const countLikes = state.getCountLikes(pinEssence.ID);
                                if (countLikes === null) {
                                    state.setCountLikes(pinEssence.ID, data.count_like);
                                    likeField.innerHTML = state.getCountLikes(pinEssence.ID);
                                    likeField.style.opacity = 1;
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            })
                    } else {
                        likeButton.src = '/assets/icons/like_active.svg';

                        const countLikes = state.addLikePin(pinEssence.ID);
                        if (countLikes !== null) {

                            likeField.innerHTML = countLikes;
                            likeField.style.opacity = 1;
                        }

                        API.setLike(pinEssence.ID)
                            .then((data) => {
                                state.setLike(pinEssence.ID, true);
                                const countLikes = state.getCountLikes(pinEssence.ID);
                                if (countLikes === null) {
                                    state.setCountLikes(pinEssence.ID, data.count_like);
                                    likeField.innerHTML = state.getCountLikes(pinEssence.ID);
                                    likeField.style.opacity = 1;
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            })
                    }
                }     
            });  
        });
    }
}