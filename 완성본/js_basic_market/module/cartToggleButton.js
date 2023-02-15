import { makeDOMwithProperties } from "../utils/dom.js";
import { CART_COOKIE_KEY } from '../constants/cart.js';


export const getCartInfo = () => JSON.parse(localStorage.getItem(CART_COOKIE_KEY)) || [];

const isInCart = (productInfo) => {
  const originalCartInfo = JSON.parse(localStorage.getItem(CART_COOKIE_KEY)) || [];
  return !!originalCartInfo.find((cartInfo) => cartInfo.id === productInfo.id);
}

const addCartInfo = (productInfo) => {
  const originalCartInfo = JSON.parse(localStorage.getItem(CART_COOKIE_KEY)) || [];
  if (originalCartInfo.findIndex((cartInfo) => cartInfo.id === productInfo.id) !== -1) return;
  localStorage.setItem(CART_COOKIE_KEY, JSON.stringify([
    ...originalCartInfo,
    productInfo
  ]));
};

const removeCartInfo = ({ id }) => {
  const originalCartInfo = JSON.parse(localStorage.getItem(CART_COOKIE_KEY)) || [];
  const newOriginalCartInfo = originalCartInfo.filter((info) => info.id !== id);
  localStorage.setItem(CART_COOKIE_KEY, JSON.stringify(newOriginalCartInfo));
}

export const getCartToggleButton = (productInfo, cartRemoveCallback) => {
  let inCart = isInCart(productInfo); // product is in cart

  const toggleCart = (productInfo) => {
    if (inCart) {
      if (!confirm(`[${productInfo.name}]을 장바구니에서 삭제할까요?`)) return; // early return
      removeCartInfo(productInfo);
      cartRemoveCallback?.();

      cartImage.src = 'public/assets/cart.png';
    } else {
      addCartInfo(productInfo);
      if (confirm('장바구니에 담았습니다. 장바구니로 이동할까요?')){
        location.href = '/js_basic_market/cart.html';
      }

      cartImage.src = 'public/assets/cartDisabled.png';
    }

    inCart = !inCart;
  }
  const cartToggleBtn = makeDOMwithProperties('button', {
    type : 'button',
    className : 'cart-toggle-btn',
    onclick: () => {
      toggleCart(productInfo);
    },
  });

  const cartImage = makeDOMwithProperties('img', {
    src : inCart ? 'public/assets/cartDisabled.png': 'public/assets/cart.png',
    className: 'cart-image'
  });

  cartToggleBtn.appendChild(cartImage);
  return cartToggleBtn;
}
