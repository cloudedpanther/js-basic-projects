import { makeDOMWithProperties } from "../utils/dom.js";
import { handleModalOpen } from "../utils/modal.js";
import {
  startTimer,
  stopTimer,
  isGameStart,
  setTimer,
  getResultTimeString,
  getNowTime,
} from "../utils/timer.js";
import { MOUSE_CONTROL_SCORE_KEY } from "../constants/localStorage.js";

let boxDOMList = [];
let wallBoxDOMList = [];
let startBoxDOM = null;
let endBoxDOM = null;

const gameFieldDOM = document.getElementById("game-field");

export const initMouseControlGame = () => {
  startBoxDOM.innerHTML = "시작";
  endBoxDOM.innerHTML = "끝";
  boxDOMList.forEach(
    (boxDOM) =>
      (boxDOM.style.backgroundColor = "transparent")
  );

  stopTimer();
  setTimer(0);
};

const handleSuccessGame = () => {
  stopTimer();

  const timeString = getResultTimeString();
  handleModalOpen({ isSuccess: true, timeString });

  const nowScore = getNowTime();
  const currentBestScore = localStorage.getItem(
    MOUSE_CONTROL_SCORE_KEY
  );

  if (!currentBestScore || nowScore < currentBestScore) {
    localStorage.setItem(MOUSE_CONTROL_SCORE_KEY, nowScore);
  }

  setTimer(0);
};

const handleFailedGame = () => {
  stopTimer();

  handleModalOpen({ isSuccess: false });

  setTimer(0);
};

export const setBoxDOM = ({
  row,
  col,
  start,
  end,
  walls,
}) => {
  const controlBoxContainer = makeDOMWithProperties("div", {
    id: "control-box-container",
    onmouseleave: () => {
      if (!isGameStart) return;

      handleFailedGame();
    },
  });

  controlBoxContainer.style.display = "grid";
  controlBoxContainer.style.gridTemplateRows = `repeat(${row}, 1fr)`;
  controlBoxContainer.style.gridTemplateColumns = `repeat(${col}, 1fr)`;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const {
        type,
        className,
        innerHTML = "",
        onmouseover,
      } = (function () {
        if (i === start[0] && j === start[1]) {
          return {
            type: "start",
            className: "control-box start",
            innerHTML: "시작",
            onmouseover: (event) => {
              startTimer(handleFailedGame);

              event.target.innerHTML = "";
            },
          };
        }
        if (i === end[0] && j === end[1]) {
          return {
            type: "end",
            className: "control-box end",
            innerHTML: "끝",
            onmouseover: (event) => {
              if (!isGameStart) return;

              event.target.innerHTML = "";
              handleSuccessGame();
            },
          };
        }
        if (
          walls.find(
            (wall) => i === wall[0] && j === wall[1]
          )
        ) {
          return {
            type: "wall",
            className: "control-box wall",
            onmouseover: () => {
              if (!isGameStart) return;

              handleFailedGame();
            },
          };
        }
        return {
          type: "normal",
          className: "control-box",
          onmouseover: (event) => {
            if (!isGameStart) return;

            event.target.style.backgroundColor = "linen";
          },
        };
      })();

      const boxDOM = makeDOMWithProperties("div", {
        id: `box-${i}-${j}`,
        className,
        innerHTML,
        onmouseover,
      });

      switch (type) {
        case "start":
          startBoxDOM = boxDOM;
          break;
        case "end":
          endBoxDOM = boxDOM;
          break;
        case "wall":
          wallBoxDOMList.push(boxDOM);
          break;
        case "normal":
        default:
          boxDOMList.push(boxDOM);
      }

      controlBoxContainer.appendChild(boxDOM);
    }
  }

  gameFieldDOM.appendChild(controlBoxContainer);
};
