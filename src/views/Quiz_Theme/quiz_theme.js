document.addEventListener('DOMContentLoaded', () => {
    const renderThemeQuizTemplate = () => {
        const templateContent = Handlebars.templates['quiz_theme.hbs'];
        const root = document.getElementById('root');
        root.innerHTML = templateContent;
    };
    renderThemeQuizTemplate();
});
