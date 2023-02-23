const MAX_TIME = 7;

const timerDOM = document.querySelector(".game-time");

export let isGameStart = false;
let time = 0;
let timerID = null;

const convertToTwoDigits = (time) => {
  const timeString = String(time);
  return timeString.length < 2
    ? "0" + timeString
    : timeString;
};

const getTimeString = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = (time % 3600) % 60;
  return `${convertToTwoDigits(hours)}:${convertToTwoDigits(
    minutes
  )}:${convertToTwoDigits(seconds)}`;
};

export const stopTimer = () => {
  isGameStart = false;
  if (timerID === null) return;
  clearInterval(timerID);
};

export const startTimer = (onTimeOver) => {
  isGameStart = true;
  timerID = setInterval(() => {
    time++;
    timerDOM.innerHTML = getTimeString(time);

    if (MAX_TIME <= time) {
      onTimeOver?.();
      stopTimer();
    }
  }, 1000);
};

export const getResultTimeString = () => {
  return getTimeString(time);
};

export const setTimer = (initTime) => {
  time = initTime;
  timerDOM.innerHTML = getTimeString(time);
};

export const getNowTime = () => {
  return time;
};
