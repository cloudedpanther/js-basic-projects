import { handleModalOpen, handleModalClose } from './module/modal.js';
import { getResultTimeString, startTimer, setTimer, stopTimer, getNowTime } from './utils/timer.js';
import { TOUCH_NUMBER_SCORE_KEY } from './constants/localstorage.js';

const numberButtonList = document.getElementsByClassName('number-button');
const maxId = numberButtonList.length; 
let currentNumber = 0;

export const initNumberButtonGame = () => {
  for(let numberButton of numberButtonList) {
    numberButton.style.display = 'block';
  }
  currentNumber = 0;
};

const handleSuccessGame = () => {
  handleModalOpen({
    isSuccess: true,
    timeString: getResultTimeString(),
  });
  stopTimer();
  const nowScore = getNowTime();
  const currentScore = localStorage.getItem(TOUCH_NUMBER_SCORE_KEY);
  if (!currentScore || currentScore > nowScore) {
    localStorage.setItem(TOUCH_NUMBER_SCORE_KEY, nowScore);
  }
  setTimer(0);
};

const handleFailedGame = () => {
  stopTimer();
  handleModalClose(setButtonDOM);
  setTimer(0);
};

const setButtonDOM = () => {  
  for(let numberButton of numberButtonList) {
    const top = Math.floor(Math.random() * 100 * 0.9);
    const left = Math.floor(Math.random() * 100 * 0.9);
    numberButton.style.top = `${top}%`;
    numberButton.style.left = `${left}%`;
    numberButton.onclick = (event) => {
      const numId = Number(event.target.innerHTML);
      if (isNaN(numId)) return;
      if (numId === 1) {
        startTimer(handleFailedGame);
      }
      if (numId !== currentNumber + 1) {
        return;
      }
      event.target.style.display = 'none';
      if (numId === maxId) {
        handleSuccessGame();
        return;
      }
      currentNumber++;
    }
  }
};

const onTouchNumberGameEnd = () => {
  stopTimer();
  setTimer(0);
  initNumberButtonGame();
  setButtonDOM();
};

const initializeTouchNumberGame = () => {
  const headerRetryButton = document.getElementsByClassName('retry-button')[0];
  const modalButtonContainer = document.getElementsByClassName('modal-button-container')[0];
  const [, retryButton] = modalButtonContainer.children;
  retryButton.onclick = () => {
    handleModalClose(onTouchNumberGameEnd);
  };
  headerRetryButton.onclick = () => {
    handleModalClose(onTouchNumberGameEnd);
  }
};

setButtonDOM();
initializeTouchNumberGame();

