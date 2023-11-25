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

            console.log('Количество активных сердечек:', activeCount);
        });
    });
});
