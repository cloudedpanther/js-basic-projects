import { getProductList } from './module/productList.js';
import { getCartInfo } from './module/cartToggleButton.js';
import { setPayInfo } from './module/payModule.js';
import { makeDOMwithProperties } from './utils/dom.js';

const cartInfo = getCartInfo() || [];

const section = document.getElementsByTagName('section')[0];
const cartPayContainer = document.getElementById('cart-pay-container');
if (cartInfo.length < 1) {
  const noticeDiv = makeDOMwithProperties('div', {
    innerHTML: '장바구니에 상품이 없습니다.',
    className: 'product-list-con'
  });
  section.insertBefore(noticeDiv, cartPayContainer);
} else {
  const productListContainer = getProductList(cartInfo, () => location.reload());
  
  section.insertBefore(productListContainer, cartPayContainer);
}

const cartAllDeleteButton = document.getElementById('remove-all-button');
cartAllDeleteButton.onclick = () => {
  if (!confirm('장바구니에 있는 물품을 모두 삭제하시겠습니까?')) return;
  // localStorage.clear();
  localStorage.removeItem(CART_COOKIE_KEY);
  location.reload();
};

setPayInfo();
