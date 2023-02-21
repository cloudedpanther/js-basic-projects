const shareURLButton = document.getElementById(
  "url-share-button"
);

export const setShareURLButton = () => {
  shareURLButton.onclick = () => {
    navigator.clipboard.writeText(location.href);
  };
};
