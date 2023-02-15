import { getCartInfo } from "./cartToggleButton.js";

const DELIVERY_FREE_PRICE = 20000;
const DELIVERY_PRICE = 3000;

const originalPriceDOM = document.getElementById('original-price');
const discountPriceDOM = document.getElementById('discount-price');
const deliveryPriceDOM = document.getElementById('delivery-price');
const totalPriceDOM = document.getElementById('total-price');

export const setPayInfo = () => {
  const cartInfo = getCartInfo();

  // forEach로 먼저 구현해보기
  
  const { originalPrice, discountPrice } = 
    cartInfo.reduce((prevValue, currValue) => ({
        originalPrice: prevValue.originalPrice + currValue.originalPrice,
        discountPrice: prevValue.discountPrice + currValue.originalPrice - currValue.price,
    }), {
      originalPrice: 0,
      discountPrice: 0,
    });

  originalPriceDOM.innerHTML = `${originalPrice.toLocaleString()}원`;
  discountPriceDOM.innerHTML = discountPrice ? `-${discountPrice.toLocaleString()}원` : '0원';

  const payPrice = originalPrice-discountPrice;
  const deliveryPrice = payPrice >= DELIVERY_FREE_PRICE ? 0 : DELIVERY_PRICE;
  deliveryPriceDOM.innerHTML = deliveryPrice ? `+${deliveryPrice.toLocaleString()}원` : '0원';
  const totalPrice = payPrice + deliveryPrice;
  totalPriceDOM.innerHTML = `${(totalPrice).toLocaleString()}원`;
};
