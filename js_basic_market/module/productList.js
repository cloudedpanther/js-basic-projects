import { makeDOMWithProperties } from "../utils/dom.js";
import { getProductCard } from "./productCard.js";

export const getProductList = (
  productInfoList,
  removeCartCallback
) => {
  if (!productInfoList && !Array.isArray(productInfoList))
    return;

  const productListContainer = makeDOMWithProperties(
    "div",
    {
      className: "product-list-con",
    }
  );

  productInfoList.forEach((productInfo) => {
    const productCard = getProductCard(
      {
        ...productInfo,
      },
      removeCartCallback
    );
    productListContainer.appendChild(productCard);
  });

  return productListContainer;
};
