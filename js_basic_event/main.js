import { countUp } from "./utils/countUp.js";
import {
  setSelectCards,
  setSelectButton,
  // setResultContainer,
} from "./module/selectCard.js";
// import { setMbtiSection } from "./module/mbtiSelect.js";
import { setTabMenu } from "./module/tabMenu.js";
// import { setShareURLButton } from "./module/share.js";

const data = {
  participate: 1341513412,
};

const participateDOM = document.getElementById(
  "participate-number"
);
countUp(participateDOM, data.participate, 5);

setTabMenu();

setSelectCards();
setSelectButton();

// setResultContainer();

// setMbtiSection();

// setShareURLButton();
