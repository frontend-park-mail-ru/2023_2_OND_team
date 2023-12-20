import { API } from "../../../utils/Api/api.js";

export class Comments {
    #pinID;
    #commentsDiv;
    #commentInput;
    #sendCommentBtn;

    constructor(pinID) {
        this.#pinID = pinID;
        defineElements();
    }

    defineElements() {
        this.#commentsDiv = document.querySelector('.pin-comments');

        this.#commentInput = document.querySelector('.pin-comments__input_text-input');
        this.#commentInput.addEventListener('keydown', (e) => {
            if (e.key != 'Enter') {
                return;
            }

            e.preventDefault();

            const commentToSend = this.#commentInput.value;
            if (commentToSend) {
                this.sendComment(commentToSend);
            }
        });

        this.#sendCommentBtn = document.querySelector('.pin-comments__input__send_message-img');
        this.#sendCommentBtn.addEventListener('click', () => {
            const commentToSend = this.#commentInput.value;
            if (commentToSend) {
                this.sendComment(commentToSend);
            }
        });
    }

    renderAllComments(comments) {
        if (comments.length) {
            comments.forEach((comment) => this.renderComment(comment));
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
        const commentTemplate = Handlebars.Templates['CommentTemplate.hbs'];
        const commentContext = {
            id: comment.id,
            username: comment.author.username,
            avatar: comment.author.avatar,
            content: comment.content,
        }

        this.#commentsDiv.insertAdjacentHTML('beforeend', commentTemplate(commentContext));
    }

    sendComment(comment) {
        API.sendCommentToPin(this.#pinID, comment)
            .then((res) => {
                if (res.status === 'ok') {
                    this.renderComment(comment);
                } else {
                    console.error(res);
                }
            })
    }
}