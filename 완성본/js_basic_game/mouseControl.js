import { handleModalClose } from "./utils/modal.js";
import { initBoxState, setBoxDom } from "./module/mouseControlModule.js";
import { stopTimer, setTimer } from "./utils/timer.js";

const onMouseControlGameEnd = () => {
  stopTimer();
  setTimer(0);
  initBoxState();
};

const initializeMouseControlGame = () => {
  // retry 버튼이 없음 
  const modalButtonContainer = document.getElementsByClassName('modal-button-container')[0];
  const [, retryButton] = modalButtonContainer.children;
  retryButton.onclick = () => handleModalClose(onMouseControlGameEnd);
};

export const gameField = document.getElementById('game-field');
setBoxDom({
  row: 5,
  col: 5,
  start: [0, 0],
  end: [4, 4],
  walls: [
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
  ]
});
initializeMouseControlGame();
