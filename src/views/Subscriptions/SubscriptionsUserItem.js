export function renderUserItems(parent, userItems) {
    const template = Handlebars.templates['SubscriptionsUserItem.hbs'];
    userItems.forEach(element => {
        const context = {
            avatar: element.avatar,
            username: element.username,
        }
        
        parent?.insertAdjacentHTML('beforeend', template(context));
    });
}