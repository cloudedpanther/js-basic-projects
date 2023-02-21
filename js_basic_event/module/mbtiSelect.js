const [selectDOM, pendingDOM, resultDOM] =
  document.querySelectorAll(".mbti-container");
const mbtiQuestionDOM = document.querySelector(
  ".mbti-question"
);
const [yesButton, noButton] =
  document.querySelector(".mbti-select").children;
const mbtiResultTitleDOM =
  document.querySelector(".mbti-result");
const mbtiResultDescriptionDOM = document.querySelector(
  ".mbti-description"
);
const mbtiRetryButton = document.querySelector(
  ".mbti-retry-button"
);

const mbtiQuestionList = [
  "짠 과자가 단 과자보다 좋다",
  "봉지 과자가 박스 과자보다 좋다",
  "과자를 뜯으면 한 번에 다 먹는다",
];

const getMbtiResult = (resultValue) => {
  switch (resultValue) {
    case 0:
      return {
        title: "과자 어린이 (A 유형)",
        description: "과자 어린이 (A 유형) 설명",
      };
    case 1:
      return {
        title: "과자 초심자 (B 유형)",
        description: "과자 초심자 (B 유형) 설명",
      };
    case 2:
      return {
        title: "과자 중급자 (C 유형)",
        description: "과자 중급자 (C 유형) 설명",
      };
    case 3:
    default:
      return {
        title: "과자 고수 (D 유형)",
        description: "과자 고수 (D 유형) 설명",
      };
  }
};

const MAX_ROUND = mbtiQuestionList.length;

let resultValue = 0;
let currentRound = 0;

const setPendingSection = () => {
  selectDOM.style.display = "none";
  pendingDOM.style.display = "block";

  setTimeout(() => {
    pendingDOM.style.display = "none";
    resultDOM.style.display = "block";
  }, 3000);
};

const initialize = () => {
  resultValue = 0;
  currentRound = 0;
  resultDOM.style.display = "none";
  pendingDOM.style.display = "none";
  selectDOM.style.display = "block";
};

const setResultSection = () => {
  const { title, description } = getMbtiResult(resultValue);
  mbtiResultTitleDOM.innerHTML = title;
  mbtiResultDescriptionDOM.innerHTML = description;

  mbtiRetryButton.onclick = initialize;
};

export const setMbtiSection = () => {
  if (currentRound === MAX_ROUND) {
    setPendingSection();
    setResultSection();
    return;
  }

  selectDOM.style.display = "block";

  mbtiQuestionDOM.innerHTML =
    mbtiQuestionList[currentRound++];

  yesButton.onclick = () => {
    resultValue++;
    setMbtiSection();
  };
  noButton.onclick = () => setMbtiSection();
};
