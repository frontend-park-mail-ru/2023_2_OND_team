import { API } from "../../../utils/Api/api.js";
import State from "../../../components/State/state.js";
import { Router } from "../../../components/Router/router.js";

export class Comments {
    #pinID;
    #flagNoComments;
    #state;
    #router;

    #commentsDiv;
    #commentInput;
    #sendCommentBtn;

    constructor(pinID) {
        this.#pinID = pinID;
        this.#flagNoComments = true;
        this.#state = new State();
        this.#router = new Router();

        this.defineElements();
    }

    defineElements() {
        this.#commentsDiv = document.querySelector('.pin-comments');

        this.#commentInput = document.querySelector('.pin-comments__input_text-input');
        this.#commentInput.addEventListener('keydown', (e) => {
            if (e.key != 'Enter') {
                return;
            }

            e.preventDefault();

            const commentToSend = this.#commentInput.value.trim();
            if (commentToSend) {
                this.sendComment(commentToSend);
            }
        });

        this.#sendCommentBtn = document.querySelector('.pin-comments__input__send_message-img');
        this.#sendCommentBtn.addEventListener('click', () => {
            const commentToSend = this.#commentInput.value.trim();
            if (commentToSend) {
                this.sendComment(commentToSend);
            }
        });
    }

    renderAllComments(comments) {
        if (comments.length) {
            this.#flagNoComments = false;

            const commentsToRender = comments.reverse();

            commentsToRender.forEach((item) => {
                const comment = {
                    id: item.id,
                    username: item.author.username,
                    avatar: item.author.avatar,
                    content: item.content,
                }

                this.renderComment(comment)
            });
        } else {
            const noCommentsDiv = document.createElement('div');
            noCommentsDiv.classList.add('pin-comments__no_content_div');

            const noCommentsMessage = document.createElement('span');
            noCommentsMessage.classList.add('pin-comments__no_content_message');
            noCommentsMessage.classList.add('text-base2-medium');
            noCommentsMessage.textContent = 'Оставьте первый комментарий';

            noCommentsDiv.appendChild(noCommentsMessage);

            this.#commentsDiv.appendChild(noCommentsDiv);
        }
    }

    renderComment(comment) {
        if (this.#flagNoComments) { 
            const noCommentsDiv = document.querySelector('.pin-comments__no_content_div');
            noCommentsDiv.classList.add('hide');

            this.#flagNoComments = false;
        }
        
        const commentTemplate = Handlebars.templates['CommentTemplate.hbs'];
        this.#commentsDiv.insertAdjacentHTML('beforeend', commentTemplate(comment));
    }

    sendComment(content) {
        if (!this.#state.getIsAuthorized()) {
            this.#router.navigate('/login')
        }

        this.#commentInput.value = '';

        API.sendCommentToPin(this.#pinID, content)
            .then((res) => {
                if (res.status === 'ok') {
                    const comment = {
                        id: -1,
                        username: this.#state.getUsername(),
                        avatar: this.#state.getAvatar(),
                        content,
                    }
                    
                    this.renderComment(comment);
                } else {
                    console.error(res);
                }
            })
    }
}