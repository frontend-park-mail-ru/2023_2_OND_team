document.addEventListener('DOMContentLoaded', () => {
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

            if (activeCount <= 2) {
                const root = document.getElementById('root');
                root.innerHTML = `
                    <div class="container">
                        <div class="rectangle">
                            <div class="title__block">
                                <span class="title-quiz text-base1-medium">Почему?</span>
                            </div>
                            <hr class="grey-line">
                            <input type="text" class="input-field">
                        </div>
                    </div>
                `;
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
                            <span class="title-quiz text-base1-medium">Почему?</span>
                        </div>
                        <hr class="grey-line">
                        <input type="text" class="input-field">
                    </div>
                </div>
            `;
        }
    });
});
