import {
  appendChildrenList,
  makeDOMWithProperties,
} from "../utils/dom.js";

export const getProductCard = ({
  imgSrc,
  name,
  discountPercent,
  price,
  originalPrice,
}) => {
  // --- product-card ---
  const productCard = makeDOMWithProperties("div", {
    className: "product-card",
  });

  // --- product-image-con ---
  const productImageCon = makeDOMWithProperties("div", {
    className: "product-image-con",
  });

  const productImage = makeDOMWithProperties("img", {
    src: imgSrc,
    alt: "파프리카 2입",
  });

  // --- cart-toggle-btn ---
  const cartToggleBtn = makeDOMWithProperties("button", {
    className: "cart-toggle-btn",
    type: "button",
  });

  const cartImage = makeDOMWithProperties("img", {
    src: "public/assets/cart.png",
    className: "cart-image",
  });

  cartToggleBtn.appendChild(cartImage);
  // --- cart-toggle-btn ---

  appendChildrenList(productImageCon, [
    productImage,
    cartToggleBtn,
  ]);
  // --- product-image-con ---

  // --- product-description ---
  const productDescription = makeDOMWithProperties("div", {
    className: "product-description",
  });

  const productName = makeDOMWithProperties("div", {
    className: "product-name",
    innerHTML: name,
  });

  // --- product-price-con ---
  const productPriceCon = makeDOMWithProperties("div", {
    className: "product-price-con",
  });

  const productDiscountPercent = makeDOMWithProperties(
    "div",
    {
      className: "product-discount-percent",
      innerHTML: `${discountPercent}%`,
    }
  );

  const productPrice = makeDOMWithProperties("div", {
    className: "product-price",
    innerHTML: `${price.toLocaleString()}원`,
  });

  appendChildrenList(productPriceCon, [
    productDiscountPercent,
    productPrice,
  ]);
  // --- product-price-con ---

  const productOriginalPrice = makeDOMWithProperties(
    "div",
    {
      className: "product-original-price",
      innerHTML: `${originalPrice.toLocaleString()}원`,
    }
  );

  appendChildrenList(productDescription, [
    productName,
    productPriceCon,
    productOriginalPrice,
  ]);
  // --- product-description ---

  appendChildrenList(productCard, [
    productImageCon,
    productDescription,
  ]);
  // --- product-card ---

  return productCard;
};
