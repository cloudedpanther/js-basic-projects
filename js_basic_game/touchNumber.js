import {
  getResultTimeString,
  getNowTime,
  setTimer,
  startTimer,
  stopTimer,
} from "./utils/timer.js";
import {
  handleModalClose,
  handleModalOpen,
} from "./utils/modal.js";
import { TOUCH_NUMBER_SCORE_KEY } from "./constants/localStorage.js";

const numberButtonList = document.querySelectorAll(
  ".number-button"
);

const maxId = numberButtonList.length;
let currentNumber = 1;

const getRandomNumber = () =>
  Math.floor(Math.random() * 100 * 0.9);

const handleSuccessGame = () => {
  stopTimer();

  const timeString = getResultTimeString();
  handleModalOpen({
    isSuccess: true,
    timeString,
  });

  const nowScore = getNowTime();
  const currentBestScore = localStorage.getItem(
    TOUCH_NUMBER_SCORE_KEY
  );

  if (!currentBestScore || nowScore < currentBestScore) {
    localStorage.setItem(TOUCH_NUMBER_SCORE_KEY, nowScore);
  }

  setTimer(0);
};

const handleFailedGame = () => {
  stopTimer();
  handleModalOpen({
    isSuccess: false,
  });
  setTimer(0);
};

const setButtonDOM = () => {
  for (let numberButton of numberButtonList) {
    numberButton.style.display = "inline-block";
    numberButton.style.top = `${getRandomNumber()}%`;
    numberButton.style.left = `${getRandomNumber()}%`;

    numberButton.onclick = (event) => {
      const numId = Number(event.target.innerHTML);
      if (isNaN(numId)) return;
      if (numId !== currentNumber) {
        return;
      }

      event.target.style.display = "none";
      if (numId === maxId) {
        handleSuccessGame();
        return;
      }
      if (numId === 1) {
        startTimer(handleFailedGame);
      }
      currentNumber++;
    };
  }
};

const initializeTouchNumberGame = () => {
  stopTimer();
  setTimer(0);
  currentNumber = 1;
  setButtonDOM();
};

const initialize = () => {
  const retryButtonList =
    document.querySelectorAll(".retry-button");

  retryButtonList.forEach((retryButton) => {
    retryButton.onclick = () => {
      handleModalClose();
      initializeTouchNumberGame(initializeTouchNumberGame);
    };
  });
};

setButtonDOM();
initialize();
