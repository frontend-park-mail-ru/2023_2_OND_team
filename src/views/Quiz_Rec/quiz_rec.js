document.addEventListener('DOMContentLoaded', () => {
    const renderRecQuizTemplate = () => {
        const templateContent = `
            <div class="container">
                <div class="rectangle">
                    <div class="title__block">
                        <span class="title-quiz text-base1-medium">Порекомендовали ли бы вы своим друзьям наш сервис?</span>
                        <img src="/assets/icons/actions/icon_cancel.svg" class="btn-cancel js-cancel__btn">
                    </div>
                    <hr class="grey-line">
                    <div class="like-buttons">
                        <img src="/assets/icons/actions/like.svg" class="like-btn js-like-btn" data-index="1">
                        <img src="/assets/icons/actions/like.svg" class="like-btn js-like-btn" data-index="2">
                        <img src="/assets/icons/actions/like.svg" class="like-btn js-like-btn" data-index="3">
                        <img src="/assets/icons/actions/like.svg" class="like-btn js-like-btn" data-index="4">
                        <img src="/assets/icons/actions/like.svg" class="like-btn js-like-btn" data-index="5">
                    </div>
                    <hr class="grey-line">
                    <div class="quiz-data__btns">
                        <button class="btn-primary-clear text-base1-medium js-quiz-close__btn-change">Закрыть</button>
                        <button class="btn-primary-default text-base1-medium js-quiz-forward__btn-change">Далее</button>
                    </div>
                </div>
            `;
        const root = document.getElementById('root');
        root.innerHTML = templateContent;

        const likeButtons = document.querySelectorAll('.js-like-btn');

        likeButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const index = button.dataset.index;

                let activeCount = 0;

                for (let i = 1; i <= index; i++) {
                    const img = document.querySelector(`.js-like-btn[data-index="${i}"]`);
                    img.src = '/assets/icons/actions/like_active.svg';
                    activeCount++;
                }

                for (let i = parseInt(index) + 1; i <= 5; i++) {
                    const img = document.querySelector(`.js-like-btn[data-index="${i}"]`);
                    img.src = '/assets/icons/actions/like.svg';
                }
                console.log('Количество активных сердечек:', activeCount);
            });
        });

        const forwardButton = document.querySelector('.js-quiz-forward__btn-change');
        forwardButton.addEventListener('click', () => {
            const activeCount = document.querySelectorAll('.like-btn[src="/assets/icons/actions/like_active.svg"]').length;
            if (activeCount <= 2) {
                const root = document.getElementById('root');
                root.innerHTML = `
                    <div class="container">
                        <div class="rectangle">
                            <div class="title__block">
                                <span class="title-quiz text-base1-medium">Расскажите, что вам не понравилось</span>
                                <img src="/assets/icons/actions/icon_cancel.svg" class="btn-cancel js-cancel__btn">
                            </div>
                            <hr class="grey-line">
                            <input type="text" class="input-primary">
                            <hr class="grey-line">
                            <div class="quiz-data__btns">
                                <button class="btn-primary-clear text-base1-medium js-quiz-back__btn-change">Назад</button>
                                <button class="btn-primary-default text-base1-medium js-quiz-forward__btn-change">Отправить</button>
                            </div>
                        </div>
                    </div>
                `;
            }

            const backButton = document.querySelector('.js-quiz-back__btn-change');
            backButton.addEventListener('click', () => {
                renderRecQuizTemplate();
            });
        });
    };
    renderRecQuizTemplate();
});
