const selectAnchorMenuDOM = document.getElementById('anchor-to-select'); 
const resultAnchorMenuDOM = document.getElementById('anchor-to-result'); 
const mbtiAnchorMenuDOM = document.getElementById('anchor-to-mbti'); 
export const selectSectionDOM = document.getElementById('participate-section');
const resultSectionDOM = document.getElementById('result-section');
const mbtiSectionDOM = document.getElementById('mbti-section');

export const setTabMenu = () => {
  selectAnchorMenuDOM.onclick = () => {
    selectSectionDOM.scrollIntoView({
      behavior: 'smooth',
    });
  };
  resultAnchorMenuDOM.onclick = () => {
    resultSectionDOM.scrollIntoView({
      behavior: 'smooth',
    });
  };
  mbtiAnchorMenuDOM.onclick = () => {
    mbtiSectionDOM.scrollIntoView({
      behavior: 'smooth',
    });
  };
};
