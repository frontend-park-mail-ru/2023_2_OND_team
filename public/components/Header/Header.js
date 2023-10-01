export const HEADER_RENDER_TYPES = {
    AUTHORIZED: "AUTHORIZED",
    NOT_AUTHORIZED: "NOT_AUTHORIZED"
};

const USER_ELEMENTS = ['feed', 'profile', 'logout']

const GUEST_ELEMENTS = ['feed', 'login', 'signup']

export class Header {
    #parent
    #config

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;

        this.state = {
            headerElements: {},
            activeElement: null,
            username: null,
        }

        this.#parent.innerHTML = this.items.map(({key, href, name}) => {
            let className = 'header__item';
            
            return `<a class="${className}" href="${href}" data-section="${key}">${name}</a>`;
        }).join('\n');

        // Дополнительно для работы со стейтом. Конечно, дублировать код — плохая практика.
        const elements = this.#parent.querySelectorAll('[data-section]');
        elements.forEach((element) => {
            this.state.headerElements[element.dataset.section] = element;
        })

    }

    get config() {
        return this.#config;
    }

    get items() {
        return Object.entries(this.config).map(([key, { href, name }]) => ({
            key,
            href,
            name
        }));
    }

    render(renderType = HEADER_RENDER_TYPES.NOT_AUTHORIZED) {
        switch(renderType) {
            case HEADER_RENDER_TYPES.AUTHORIZED:
                this.renderHeader(USER_ELEMENTS);
                break;
            case HEADER_RENDER_TYPES.NOT_AUTHORIZED:
            default:
                this.renderHeader(GUEST_ELEMENTS);
        }
    }

    renderHeader(headerElements) {
        const filteredItems = this.items.filter(item => headerElements.includes(item.key));
        
        this.#parent.innerHTML = filteredItems.map(({ key, href, name }) => {
            let className = 'header__item';
            switch (key) {
                case 'feed':
                    return `<div class="header-logo">
                                <a class="${className}" href="${href}" data-section="${key}">
                                    <img src="static/svg/logo102x74.svg" alt="Logo">
                                </a>
                                <a class="${className}" href="${href}" data-section="${key}">
                                    <img src="static/svg/logoString200x46.svg" alt="logoString">
                                </a>
                            </div>`;

                case 'profile':
                    return `<div class="header-user">
                                <a class="${className}" href="${href}" data-section="${key}">${this.state.username}</a>
                                <a class="${className}" href="/logout" data-section="logout">Выйти</a>
                            </div>
                    <a class="${className}" href="${href}" data-section="${key}">${this.state.username}</a>`;
                case 'logout':
                    break
                default:
                    return `<a class="${className}" href="${href}" data-section="${key}">${name}</a>`;
            }
               
        }).join('\n');
    }

}
