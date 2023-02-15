import { SELECT_RESULT_KEY } from '../constants/result.js';
import { makeDOMwithProperties, appendChildrenList } from '../utils/dom.js';
import { selectSectionDOM } from './tabMenu.js';

const cardInfoList = [
  {
    id: 1,
    imgSrc: '/js_basic_event/public/assets/초코꼬북칩.jpeg',
    name: '초코꼬북칩',
    description: '맛있는 초코꼬북칩'
  }, {
    id: 2,
    imgSrc: '/js_basic_event/public/assets/나쵸.jpeg',
    name: '나쵸',
    description: '맛있는 나쵸'
  }, {
    id: 3,
    imgSrc: '/js_basic_event/public/assets/홈런볼.jpeg',
    name: '홈런볼',
    description: '맛있는 홈런볼'
  }, {
    id: 4,
    imgSrc: '/js_basic_event/public/assets/허니버터칩.jpeg',
    name: '허니버터칩',
    description: '맛있는 허니버터칩'
  }
];

export const snackCardList = document.getElementsByClassName('snack-card-list')?.[0];
const selectButtonDOM = document.getElementsByClassName('participate-button')[0];
const [notyetContainerDOM, resultContainerDOM]
 = document.getElementsByClassName('result-container');
const [, resultImageDOM, resultNameDOM, resultDescriptionDOM, selectRetryButton] = resultContainerDOM.children;

const getCardById = (id) => {
  return document.getElementById(`select-${id}`);
}

const handleSelectCard = (id) => {
  const originalSelectedCard = document.getElementsByClassName('select')[0];
  originalSelectedCard?.classList.remove('select');

  const newSelectedCard = getCardById(id);
  newSelectedCard.classList.add('select');
}

export const getSelectCard = ({
  id,
  imgSrc,
  name,
  description,
}) => {
  const snackCardDOM = makeDOMwithProperties('button', {
    id: `select-${id}`,
    className: 'snack-card',
    onclick: () => handleSelectCard(id),
  });

  const imageDOM = makeDOMwithProperties('img', {
    src: imgSrc,
    alt: name,
  });

  const descriptionContainerDOM = makeDOMwithProperties('div', {
    className: 'snack-description',
  });
  const nameDOM = makeDOMwithProperties('div', {
    innerHTML: name,
  });
  const descriptionDOM = makeDOMwithProperties('div', {
    innerHTML: description,
  });

  appendChildrenList(descriptionContainerDOM, [nameDOM, descriptionDOM]);
  appendChildrenList(snackCardDOM, [imageDOM, descriptionContainerDOM]);

  return snackCardDOM;
};

export const setSelectCards = () => {
  // 나중에 다시하기 구현 시 추가 -> 주소 복사
  const snackCards = Object.assign([], snackCardList.children);
  snackCards.forEach((snackCard) => snackCard.remove());

  cardInfoList.forEach((cardInfo) => {
    const selectCard = getSelectCard(cardInfo);
    snackCardList?.appendChild(selectCard);
  });

  const selectedId = Number(localStorage.getItem(SELECT_RESULT_KEY));
  if (!selectedId || isNaN(selectedId)) return;

  handleSelectCard(selectedId);
};

export const setSelectButton = async () => {
  selectButtonDOM.onclick = async () => {
    const selectedCard = document.getElementsByClassName('select')[0];
    if (!selectedCard) {
      alert("선택된 카드가 없습니다.");
      return;
    }
    const id = selectedCard.id?.split('-')?.[1] || 0;

    localStorage.setItem(SELECT_RESULT_KEY, id);
    setResultContainer();
  };
};

const initialize = () => {
  localStorage.removeItem(SELECT_RESULT_KEY);
  selectSectionDOM.scrollIntoView({
    behavior: 'smooth',
  });
  setSelectCards();
  setResultContainer();
};

export const setResultContainer = () => {
  const selectedId = Number(localStorage.getItem(SELECT_RESULT_KEY));

  const isSelected = !!selectedId;
  if (!isSelected) {
    notyetContainerDOM.style.display = 'block';
    resultContainerDOM.style.display = 'none';
    return;
  }

  notyetContainerDOM.style.display = 'none';
  resultContainerDOM.style.display = 'flex';
  
  const cardInfo = cardInfoList.find((info) => info.id === selectedId);
  
  resultImageDOM.src = cardInfo.imgSrc;
  resultImageDOM.alt = cardInfo.name;
  resultNameDOM.innerHTML = cardInfo.name;
  resultDescriptionDOM.innerHTML = cardInfo.description;

  selectRetryButton.onclick = initialize;
}
