import { makeDOMWithProperties } from "./utils/dom.js";
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
import { ARROW_SPEED_SCORE_KEY } from "./constants/localStorage.js";

const MAX_ARROW = 8;
const MAX_ROUND = 3;

const ARROW_LEFT = "ArrowLeft";
const ARROW_RIGHT = "ArrowRight";

const arrowFieldDOM =
  document.getElementById("arrow-field");

let arrowDOMList = [];
let currentIndex = 0;
let round = 1;

const clearArrowDOM = () => {
  arrowDOMList.forEach((arrowDOM) => {
    arrowDOM.remove();
  });
  arrowDOMList = [];
};

const setArrowDOM = () => {
  clearArrowDOM();

  for (let i = 0; i < MAX_ARROW; i++) {
    const direction = Math.floor(Math.random() * 2)
      ? "left"
      : "right";
    const arrowDOM = makeDOMWithProperties("span", {
      className: `arrow arrow-${direction}`,
      innerHTML: direction === "left" ? "&lt;" : "&gt;",
    });
    arrowDOMList.push(arrowDOM);
    arrowFieldDOM.appendChild(arrowDOM);
  }
};

const handleSuccesGame = () => {
  stopTimer();

  const timeString = getResultTimeString();
  handleModalOpen({
    isSuccess: true,
    timeString,
  });

  const nowScore = getNowTime();
  const currentBestScore = localStorage.getItem(
    ARROW_SPEED_SCORE_KEY
  );

  if (!currentBestScore || nowScore < currentBestScore) {
    localStorage.setItem(ARROW_SPEED_SCORE_KEY, nowScore);
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

const setKeyboardEvent = () => {
  const handleCorrect = () => {
    arrowDOMList[currentIndex].style.display = "none";
    currentIndex++;

    if (currentIndex === MAX_ARROW) {
      if (round === MAX_ROUND) {
        handleSuccesGame();
        return;
      }

      currentIndex = 0;
      round++;
      setArrowDOM();
    }
  };

  window.addEventListener("keydown", (event) => {
    if (currentIndex === MAX_ARROW && round === MAX_ROUND) {
      return;
    }

    if (![ARROW_LEFT, ARROW_RIGHT].includes(event.code)) {
      return;
    }

    const isFirst = currentIndex === 0 && round === 1;
    if (isFirst) {
      startTimer(handleFailedGame);
    }

    const isLeft =
      arrowDOMList[currentIndex].innerHTML === "&lt;";
    if (isLeft && event.code === ARROW_LEFT) {
      handleCorrect();
    } else if (!isLeft && event.code === ARROW_RIGHT) {
      handleCorrect();
    }
  });
};

const onArrowSpeedGameEnd = () => {
  stopTimer();
  setTimer(0);

  currentIndex = 0;
  round = 1;

  setArrowDOM();
};

const initialize = () => {
  const retryButtonList =
    document.querySelectorAll(".retry-button");

  retryButtonList.forEach((retryButton) => {
    retryButton.onclick = () => {
      handleModalClose(onArrowSpeedGameEnd);
    };
  });
};

setArrowDOM();
setKeyboardEvent();
initialize();
