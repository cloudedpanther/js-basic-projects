import { CART_COOKIE_KEY } from "./constants/cart.js";
import { getCartInfo } from "./module/cartToggleButton.js";
import { setPayInfo } from "./module/payModule.js";
import { getProductList } from "./module/productList.js";
import { makeDOMWithProperties } from "./utils/dom.js";

const sectionDOM = document.querySelector("section");
const cartPayContainerDOM = document.querySelector(
  "#cart-pay-container"
);

const cartInfo = getCartInfo();

const reloadPage = () => location.reload();

if (cartInfo.length < 1) {
  const noticeDOM = makeDOMWithProperties("div", {
    innerHTML: "장바구니에 상품이 없습니다.",
    className: "product-list-con",
  });
  sectionDOM.insertBefore(noticeDOM, cartPayContainerDOM);
} else {
  const productListDOM = getProductList(
    cartInfo,
    reloadPage
  );
  sectionDOM.insertBefore(
    productListDOM,
    cartPayContainerDOM
  );
}

const cartAllDeleteButtonDOM = document.querySelector(
  "#remove-all-button"
);
cartAllDeleteButtonDOM.onclick = () => {
  localStorage.removeItem(CART_COOKIE_KEY);
  reloadPage();
};

setPayInfo();
