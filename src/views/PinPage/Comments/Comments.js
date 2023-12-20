export class Comments {
    #commentsDiv;

    constructor() {
        this.#commentsDiv = document.querySelector('.pin-comments');
    }

    renderAllComments(comments) {
        comments?.forEach((comment) => this.renderComment(comment));
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