import { gameField } from "../mouseControl.js";
import { MOUSE_CONTROL_SCORE_KEY } from "../constants/localstorage.js";
import { makeDOMwithProperties } from "../utils/dom.js";
import { isGameStart, getResultTimeString, startTimer, stopTimer, getNowTime, setTimer } from '../utils/timer.js';
import { handleModalOpen } from "../utils/modal.js";

let boxDOMList = [];
let wallBoxDOMList = [];
let startBoxDOM = null;
let endBoxDOM = null;

export const initBoxState = () => {
  startBoxDOM.innerHTML = '시작';
  boxDOMList.forEach((boxDOM) => {
    boxDOM.style.backgroundColor = 'transparent';
  })
  endBoxDOM.innerHTML = '끝';
};

const handleSuccessGame = () => {
  stopTimer();
  
  handleModalOpen({
    isSuccess: true,
    timeString: getResultTimeString(),
  });

  const nowScore = getNowTime();
  const currentScore = localStorage.getItem(MOUSE_CONTROL_SCORE_KEY);
  if (!currentScore || currentScore > nowScore) {
    localStorage.setItem(MOUSE_CONTROL_SCORE_KEY, nowScore);
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

export const setBoxDom = ({
  row,
  col,
  start,
  end,
  walls,
}) => {
  const controlBoxContainer = makeDOMwithProperties('div', {
    id: 'control-box-container',
    onmouseleave: () => {
      if (!isGameStart) return;
      handleFailedGame();
    }
  });
  controlBoxContainer.style.gridTemplateRows = `repeat(${row}, 1fr)`;
  controlBoxContainer.style.gridTemplateColumns = `repeat(${col}, 1fr)`;

  for(let i=0; i<row; i++) {
    for(let j=0; j<col; j++) {
      const { type, className, onmouseover, innerHTML = '' } = (function(){
        if (i === start[0] && j === start[1]) return {
          type: 'start',
          className: 'control-box start',
          onmouseover: (event) => {
            startTimer(() => {
              handleFailedGame();
            });
            event.target.innerHTML = '';
          },
          innerHTML: '시작',
        };
        if (i === end[0] && j === end[1]) return {
          type: 'end',
          className: 'control-box end',
          onmouseover: (event) => {
            if (!isGameStart) return;
            event.target.innerHTML = '';
            handleSuccessGame();
          },
          innerHTML: '끝',
        };
        for(let wall of walls) {
          if (i === wall[0] && j === wall[1]) return {
            type: 'wall',
            className: 'control-box wall',
            onmouseover: () => {
              if (!isGameStart) return;
              handleFailedGame();
            },
          };
        }
        return {
          type: 'normal',
          className:'control-box',
          onmouseover: (event) => {
            if (!isGameStart) return;
            event.target.style.backgroundColor = 'linen';
          }
        };
      }());
      const boxDOM = makeDOMwithProperties('div', {
        className,
        onmouseover,
        innerHTML,
        id: `box-${i}-${j}`,
      });
      
      switch(type) {
        case 'start': 
          startBoxDOM = boxDOM;
          break;
        case 'end':
          endBoxDOM = boxDOM;
          break;
        case 'wall':
          wallBoxDOMList.push(boxDOM);
          break;
        default:
          boxDOMList.push(boxDOM);
      }

      controlBoxContainer.appendChild(boxDOM);
    }
  }
  gameField.appendChild(controlBoxContainer);
};
