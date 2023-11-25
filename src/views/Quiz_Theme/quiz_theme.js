document.addEventListener('DOMContentLoaded', () => {
    const renderThemeQuizTemplate = () => {
        const templateContent = `
            <div class="container">
                <div class="rectangle">
                    <div class="title__block">
                    <span class="title-quiz text-base1-medium">Какие темы Вам интересны?</span>
                    <img src="/assets/icons/actions/icon_cancel.svg" class="btn-cancel js-cancel__btn">
                </div>
                <hr class="grey-line">
                <form class="quiz__pointer text-base1-regular">
                    <label class="quiz__pointer">
                        <input type="radio" name="choice" value="people">
                        <span class="checkmark">Путешествия</span>
                    </label>
                    <label class="quiz__pointer">
                        <input type="radio" name="choice" value="social_media">
                        <span class="checkmark">Дизайн</span>
                    </label>
                    <label class="quiz__pointer">
                        <input type="radio" name="choice" value="music">
                        <span class="checkmark">Музыка</span>
                    </label>
                    <label class="quiz__pointer">
                        <input type="radio" name="choice" value="other">
                        <span class="checkmark">Кулинария</span>
                    </label>
                    <label class="quiz__pointer">
                        <input type="radio" name="choice" value="other">
                        <span class="checkmark">Спорт</span>
                    </label>
                    <label class="quiz__pointer">
                        <input type="radio" name="choice" value="other">
                        <span class="checkmark">Политика</span>
                    </label>
                    <label class="quiz__pointer">
                        <input type="radio" name="choice" value="other">
                        <span class="checkmark">Другое</span>
                    </label>
                </form>
                <hr class="grey-line">
                <div class="quiz-data__btns">
                    <button class="btn-primary-clear text-base1-medium js-quiz-close__btn-change">Закрыть</button>
                    <button class="btn-primary-default text-base1-medium js-quiz-forward__btn-change">Отправить</button>
                </div>
            </div>
        `;
        const root = document.getElementById('root');
        root.innerHTML = templateContent;
    };
    renderThemeQuizTemplate();
});
