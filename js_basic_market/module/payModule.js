import { getCartInfo } from "./cartToggleButton.js";

const DELIVERY_FREE_PRICE = 20000;
const DELIVERY_PRICE = 3000;

const originalPriceDOM = document.getElementById(
  "original-price"
);
const discountPriceDOM = document.getElementById(
  "discount-price"
);
const deliveryPriceDOM = document.getElementById(
  "delivery-price"
);
const totalPriceDOM =
  document.getElementById("total-price");

export const setPayInfo = () => {
  const cartInfoList = getCartInfo();

  let deliveryPrice = 0;
  let totalPrice = 0;

  const { originalPrice, discountPrice } =
    cartInfoList.reduce(
      (acc, cur) => ({
        originalPrice:
          acc.originalPrice + cur.originalPrice,
        discountPrice:
          acc.discountPrice +
          (cur.originalPrice - cur.price),
      }),
      {
        originalPrice: 0,
        discountPrice: 0,
      }
    );

  const payPrice = originalPrice - discountPrice;

  if (payPrice >= DELIVERY_FREE_PRICE) {
    deliveryPrice = 0;
  } else {
    deliveryPrice = DELIVERY_PRICE;
  }

  totalPrice = payPrice + deliveryPrice;

  originalPriceDOM.innerHTML = `${originalPrice.toLocaleString()}원`;
  discountPriceDOM.innerHTML = discountPrice
    ? `-${discountPrice.toLocaleString()}원`
    : "0원";
  deliveryPriceDOM.innerHTML = deliveryPrice
    ? `+${deliveryPrice.toLocaleString()}원`
    : "0원";
  totalPriceDOM.innerHTML = `${totalPrice.toLocaleString()}원`;
};
