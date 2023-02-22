const modalDOM = document.querySelector(".modal");
const modalTitleDOM =
  document.querySelector(".modal-title");
const modalDescriptionDOM = document.querySelector(
  ".modal-description"
);

export const handleModalOpen = ({
  isSuccess,
  timeString,
}) => {
  modalDOM.classList.add("open");

  if (isSuccess) {
    modalTitleDOM.innerHTML = "성공!";
    modalDescriptionDOM.innerHTML = `${timeString}만에 통과했어요.`;
  } else {
    modalTitleDOM.innerHTML = "실패!";
    modalDescriptionDOM.innerHTML = "다시 시도해보세요.";
  }
};

export const handleModalClose = (onModalClose) => {
  modalDOM.classList.remove("open");
  onModalClose?.();
};
