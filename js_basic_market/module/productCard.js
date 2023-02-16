import {
  appendChildrenList,
  makeDOMWithProperties,
} from "../utils/dom.js";
import { getCartToggleButton } from "./cartToggleButton.js";

export const getProductCard = (
  productInfo,
  removeCartCallback
) => {
  const {
    imgSrc,
    name,
    discountPercent,
    price,
    originalPrice,
  } = productInfo;

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

  const cartToggleBtn = getCartToggleButton(
    productInfo,
    removeCartCallback
  );

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
