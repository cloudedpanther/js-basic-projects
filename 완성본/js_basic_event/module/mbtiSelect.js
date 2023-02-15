const mbtiQuestionDOM = document.getElementsByClassName('mbti-question')[0];
const [yesButton, noButton] = document.getElementsByClassName('mbti-select')[0].children;
const [selectDOM, pendingDOM, resultDOM] = document.getElementsByClassName('mbti-container');
const mbtiResultTitleDOM = document.getElementsByClassName('mbti-result')[0];
const mbtiResultDescriptionDOM = document.getElementsByClassName('mbti-description')[0];
const mbtiRetryButton = document.getElementsByClassName('mbti-retry-button')[0];

const mbtiQuestionObj = [
  "짠 과자가 단 과자보다 좋다.",
  "봉지 과자가 박스 과자보다 좋다.",
  "과자를 뜯으면 한 번에 다 먹는다.",
];
const maxRound = mbtiQuestionObj.length;

const getMbtiResult = (resultValue) => {
  switch(resultValue) {
    case 0:
      return {
        title: "과자 어린이 (A 유형)",
        description: "과자 어린이 (A 유형) 설명"
      };
    case 1:
      return {
        title: "과자 초심자 (B 유형)",
        description: "과자 초심자 (B 유형) 설명"
      };
    case 2:
      return {
        title: "과자 중급자 (C 유형)",
        description: "과자 중급자 (C 유형) 설명"
      };
    case 3:
    default:
      return {
        title: "과자 고수 (D 유형)",
        description: "과자 고수 (D 유형) 설명"
      }
  }
};

let currentRound = 0;
let resultValue = 0;
export const setMbtiSection =  () => {
  if (currentRound === maxRound) {
    setMbtiPendingSection();
    setResult();
    return;
  }
  mbtiQuestionDOM.innerHTML = mbtiQuestionObj[currentRound++];
  yesButton.onclick =  () => {
    resultValue++;
    setMbtiSection();
  };
  noButton.onclick =  () => {
    setMbtiSection();
  };
};

const initialize = () => {
  currentRound = 0;
  resultValue = 0;
  selectDOM.style.display = 'block';
  pendingDOM.style.display = 'none';
  resultDOM.style.display = 'none';
};

const setResult = () => {
  const { title, description } = getMbtiResult(resultValue);
  mbtiResultTitleDOM.innerHTML = title;
  mbtiResultDescriptionDOM.innerHTML = description;

  mbtiRetryButton.onclick = initialize;
}

const setMbtiPendingSection = () => {
  selectDOM.style.display = 'none';
  pendingDOM.style.display = 'block';

  setTimeout(() => {
    pendingDOM.style.display = 'none';
    resultDOM.style.display = 'block';
  }, 2000);
};
