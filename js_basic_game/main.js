import {
  appendChildrenList,
  makeDOMWithProperties,
} from "./utils/dom.js";
import {
  MOUSE_CONTROL_SCORE_KEY,
  TOUCH_NUMBER_SCORE_KEY,
  ARROW_SPEED_SCORE_KEY,
} from "./constants/localStorage.js";
import { getTimeString } from "./utils/timer.js";

const gameInfoList = [
  {
    id: 1,
    url: "mouse_control.html",
    thumbnail:
      "./public/assets/mouse_control_thumbnail.png",
    title: "마우스컨트롤 게임",
    isNew: false,
  },
  {
    id: 2,
    url: "arrow_speed.html",
    thumbnail: "./public/assets/arrow_speed_thumbnail.png",
    title: "방향키 게임",
    isNew: true,
  },
  {
    id: 3,
    url: "touch_number.html",
    thumbnail: "./public/assets/touch_number_thumbnail.png",
    title: "숫자 클릭 게임",
    isNew: false,
  },
];

const localStorageKeyMap = {
  1: MOUSE_CONTROL_SCORE_KEY,
  2: ARROW_SPEED_SCORE_KEY,
  3: TOUCH_NUMBER_SCORE_KEY,
};

const getGameCard = ({
  id,
  url,
  thumbnail,
  title,
  isNew,
}) => {
  const gameCardDOM = makeDOMWithProperties("a", {
    className: "game-card",
    href: url,
  });
  const thumbnailDOM = makeDOMWithProperties("img", {
    src: thumbnail,
    alt: title,
  });
  const newBadgeDOM = isNew
    ? makeDOMWithProperties("span", {
        className: "game-new-badge",
        innerHTML: "new",
      })
    : null;
  const titleDOM = makeDOMWithProperties("div", {
    className: "game-title",
    innerHTML: title,
  });

  const result = localStorage.getItem(
    localStorageKeyMap[id]
  );

  const resultDOM = makeDOMWithProperties("div", {
    className: "game-result",
    innerHTML: result
      ? `최고기록: ${getTimeString(result)}`
      : "도전해보세요!",
  });

  appendChildrenList(gameCardDOM, [
    thumbnailDOM,
    newBadgeDOM,
    titleDOM,
    resultDOM,
  ]);

  return gameCardDOM;
};

const gameListContainer = document.getElementById(
  "game-list-container"
);

gameInfoList.forEach((gameInfo) => {
  const cardDOM = getGameCard(gameInfo);
  gameListContainer.appendChild(cardDOM);
});
