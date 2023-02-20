import {
  appendChildrenList,
  makeDOMWithProperties,
} from "../utils/dom.js";
import { SELECT_RESULT_KEY } from "../constants/result.js";

const cardInfoList = [
  {
    id: 1,
    imgSrc: "/js_basic_event/public/assets/초코꼬북칩.jpeg",
    name: "초코꼬북칩",
    description: "맛있는 초코꼬북칩",
  },
  {
    id: 2,
    imgSrc: "/js_basic_event/public/assets/나쵸.jpeg",
    name: "나쵸",
    description: "맛있는 나쵸",
  },
  {
    id: 3,
    imgSrc: "/js_basic_event/public/assets/허니버터칩.jpeg",
    name: "허니버터칩",
    description: "맛있는 허니버터칩",
  },
  {
    id: 4,
    imgSrc: "/js_basic_event/public/assets/홈런볼.jpeg",
    name: "홈런볼",
    description: "맛있는 홈런볼",
  },
];

const snackCardList = document.querySelector(
  ".snack-card-list"
);
const selectButtonDOM = document.querySelector(
  ".participate-button"
);
const [notYetContainerDOM, resultContainerDOM] =
  document.querySelectorAll(".result-container");
const [
  ,
  resultImageDOM,
  resultNameDOM,
  resultDescriptionDOM,
  selectRetryButtonDOM,
] = resultContainerDOM.children;

const getSelectedCard = () => {
  return snackCardList.querySelector(".select");
};

const getCardById = (id) => {
  return snackCardList.querySelector(`#select-${id}`);
};

const handleSelectCard = (id) => {
  getSelectedCard()?.classList.remove("select");

  getCardById(id)?.classList.add("select");
};

const getSelectCardDOM = ({
  id,
  imgSrc,
  name,
  description,
}) => {
  const snackCardDOM = makeDOMWithProperties("button", {
    id: `select-${id}`,
    className: "snack-card",
    onclick: () => handleSelectCard(id),
  });

  const imageDOM = makeDOMWithProperties("img", {
    src: imgSrc,
    alt: name,
  });

  const descriptionContainerDOM = makeDOMWithProperties(
    "div",
    {
      className: "snack-description",
    }
  );

  const nameDOM = makeDOMWithProperties("div", {
    innerHTML: name,
  });

  const descriptionDOM = makeDOMWithProperties("div", {
    innerHTML: description,
  });

  appendChildrenList(descriptionContainerDOM, [
    nameDOM,
    descriptionDOM,
  ]);
  appendChildrenList(snackCardDOM, [
    imageDOM,
    descriptionContainerDOM,
  ]);

  return snackCardDOM;
};

export const setSelectCards = () => {
  const originalSnackCards = [...snackCardList.children];
  originalSnackCards.forEach((snackCard) =>
    snackCard.remove()
  );

  cardInfoList.forEach((cardInfo) => {
    const selectCardDOM = getSelectCardDOM(cardInfo);
    snackCardList.appendChild(selectCardDOM);
  });

  const cardId = localStorage.getItem(SELECT_RESULT_KEY);
  if (!cardId || isNaN(cardId)) return;

  handleSelectCard(cardId);
};

export const setSelectButton = () => {
  selectButtonDOM.onclick = () => {
    const selectedCard = getSelectedCard();
    if (!selectedCard) {
      alert("선택된 카드가 없습니다.");
      return;
    }

    const cardId = selectedCard.id?.split("-")[1];
    localStorage.setItem(SELECT_RESULT_KEY, cardId);
    setResultContainer();
  };
};

const initialize = () => {
  localStorage.removeItem(SELECT_RESULT_KEY);

  setSelectCards();
  setResultContainer();

  const selectSectionDOM = document.getElementById(
    "participate-section"
  );
  const scrollTargetY = selectSectionDOM.offsetTop;
  window.scroll({
    top: scrollTargetY,
    left: 0,
    behavior: "smooth",
  });
};

export const setResultContainer = () => {
  const selectedId = Number(
    localStorage.getItem(SELECT_RESULT_KEY)
  );

  const isSelected = !!selectedId;
  if (!isSelected) {
    notYetContainerDOM.style.display = "block";
    resultContainerDOM.style.display = "none";
    return;
  }

  notYetContainerDOM.style.display = "none";
  resultContainerDOM.style.display = "flex";

  const { imgSrc, name, description } = cardInfoList.find(
    (cardInfo) => cardInfo.id === selectedId
  );

  resultImageDOM.src = imgSrc;
  resultImageDOM.alt = name;
  resultNameDOM.innerHTML = name;
  resultDescriptionDOM.innerHTML = description;

  selectRetryButtonDOM.onclick = () => initialize();
};
