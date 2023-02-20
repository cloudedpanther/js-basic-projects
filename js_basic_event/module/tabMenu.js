const selectAnchorMenuDOM = document.getElementById(
  "anchor-to-select"
);
const resultAnchorMenuDOM = document.getElementById(
  "anchor-to-result"
);
const mbtiAnchorMenuDOM = document.getElementById(
  "anchor-to-mbti"
);

const selectSectionDOM = document.getElementById(
  "participate-section"
);
const resultSectionDOM = document.getElementById(
  "result-section"
);
const mbtiSectionDOM =
  document.getElementById("mbti-section");

const setScrollHandler = (anchorDOM, targetDOM) => {
  anchorDOM.onclick = () => {
    const scrollTargetY = targetDOM.offsetTop;
    window.scroll({
      top: scrollTargetY,
      left: 0,
      behavior: "smooth",
    });
  };
};

export const setTabMenu = () => {
  setScrollHandler(selectAnchorMenuDOM, selectSectionDOM);
  setScrollHandler(resultAnchorMenuDOM, resultSectionDOM);
  setScrollHandler(mbtiAnchorMenuDOM, mbtiSectionDOM);
};
