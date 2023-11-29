import {Router} from '../../components/Router/router.js';

export function defineBoards() {
  const router = new Router();

  const boards = document.querySelectorAll('.user__board');

  boards?.forEach((board) => {
    board.addEventListener('click', (e) => {
      const boardID = board.className.split(' ')[1].split('-')[3];
      router.navigate(`/board/${boardID}`);
    });
  });
}
