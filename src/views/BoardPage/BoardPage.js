export async function renderBoardPage(boardID) {
    const router = new Router();
    const main = document.querySelector('#main');
    const state = new State();
    const boardPage = Handlebars.templates['BoardPage.hbs'];

    try {
        const boardInfo = await API.getBoardInfo(boardID);
        console.log('Информация о доске:', boardInfo);

        const context = {
            title: boardInfo.title,
            description: boardInfo.description
        };

        main.innerHTML = boardPage(context);

        const usernameReal = state.getUsername();

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.classList.add('delete-button');

        deleteButton.addEventListener('click', async function (e) {
            e.preventDefault();
            await API.deleteBoard(boardID);
            router.navigate('/profile');
        });

        const updateButton = document.createElement('img');
        updateButton.src = 'https://pinspire.online:1445/assets/icons/actions/icon_edit.svg';
        updateButton.classList.add('edit-button');

        console.log(usernameReal);

        const rec = document.querySelector('.bar');
        rec.appendChild(deleteButton);
        rec.appendChild(updateButton);

        await renderBoardPins();
    } catch (error) {
        console.error('Ошибка при получении информации о доске:', error);
        router.navigate('/page404');
    }

    async function renderBoardPins() {
        try {
            const data = await API.getBoardPins(boardID);
            const section = document.getElementById('board-pins');
            renderPins(section, data.pins);
        } catch (error) {
            console.error('Ошибка при рендеринге пинов:', error);
        }
    }
}
