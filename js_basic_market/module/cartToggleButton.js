import { makeDOMWithProperties } from "../utils/dom.js";
import { CART_COOKIE_KEY } from "../constants/cart.js";

export const getCartInfo = () =>
  JSON.parse(localStorage.getItem(CART_COOKIE_KEY)) || [];

const isInCart = ({ id }) => {
  const originalCartInfo = getCartInfo();

  return !!originalCartInfo.find(
    (cartInfo) => cartInfo.id === id
  );
};

const addCartInfo = (productInfo) => {
  const originalCartInfo = getCartInfo();

  if (
    originalCartInfo.findIndex(
      (cartInfo) => cartInfo.id === productInfo.id
    ) !== -1
  )
    return;

  localStorage.setItem(
    CART_COOKIE_KEY,
    JSON.stringify([...originalCartInfo, productInfo])
  );
};

const removeCartInfo = ({ id }) => {
  const originalCartInfo = getCartInfo();

  const newCartInfo = originalCartInfo.filter(
    (cartInfo) => cartInfo.id !== id
  );

  localStorage.setItem(
    CART_COOKIE_KEY,
    JSON.stringify(newCartInfo)
  );
};

export const getCartToggleButton = (
  productInfo,
  removeCartCallback
) => {
  let inCart = isInCart(productInfo);

  const cartToggleBtn = makeDOMWithProperties("button", {
    className: "cart-toggle-btn",
    type: "button",
    onclick: () => {
      if (inCart) {
        if (
          !confirm(
            `${productInfo.name}을(를) 장바구니에서 삭제할까요?`
          )
        )
          return;
        removeCartInfo(productInfo);
        cartImage.src = "public/assets/cart.png";
        removeCartCallback?.();
      } else {
        addCartInfo(productInfo);
        cartImage.src = "public/assets/cartDisabled.png";
        if (
          confirm(
            "장바구니에 담았습니다. 장바구니 페이지로 이동할까요?"
          )
        ) {
          location.href = "/js_basic_market/cart.html";
        }
      }

      inCart = !inCart;
    },
  });

  const cartImage = makeDOMWithProperties("img", {
    className: "cart-image",
    src: inCart
      ? "public/assets/cartDisabled.png"
      : "public/assets/cart.png",
  });

  cartToggleBtn.appendChild(cartImage);

  return cartToggleBtn;
};
