export class Comments {
    #commentsDiv;

    constructor() {
        this.#commentsDiv = document.querySelector('.pin-comments');
    }

    renderAllComments(comments) {
        console.log('comments')
        if (comments.length) {
            console.log('coms:', comments)
            comments.forEach((comment) => this.renderComment(comment));
        } else {
            const noCommentsDiv = document.createElement('div');
            noCommentsDiv.classList.add('pin-comments__no_content_div');

            const noCommentsMessage = document.createElement('span');
            noCommentsMessage.classList.add('pin-comments__no_content_message');
            noCommentsMessage.content = 'Оставьте первый комментарий';

            noCommentsDiv.appendChild(noCommentsMessage);

            this.#commentsDiv.innerHTML = noCommentsDiv;
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
}