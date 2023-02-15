import { makeDOMWithProperties } from "../utils/dom.js";
import { getProductCard } from "./productCard.js";

export const getProductList = (productInfoList) => {
  if (!productInfoList && !Array.isArray(productInfoList))
    return;

  const productListContainer = makeDOMWithProperties(
    "div",
    {
      className: "product-list-con",
    }
  );

  productInfoList.forEach((productInfo) => {
    const productCard = getProductCard({
      ...productInfo,
    });
    productListContainer.appendChild(productCard);
  });

  return productListContainer;
};
