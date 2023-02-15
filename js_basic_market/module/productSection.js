import {
  appendChildrenList,
  makeDOMWithProperties,
} from "../utils/dom.js";
import { getProductList } from "./productList.js";

export const getProductSection = (
  sectionName,
  productInfoList
) => {
  const productListSection = makeDOMWithProperties(
    "section",
    {
      className: "product-list-section",
    }
  );

  // --- section-title ---
  const sectionTitle = makeDOMWithProperties("div", {
    className: "section-title",
  });

  const titleHighlight = makeDOMWithProperties("span", {
    className: "section-title-highlight",
  });

  const title = makeDOMWithProperties("span", {
    innerHTML: sectionName,
  });

  appendChildrenList(sectionTitle, [titleHighlight, title]);
  // --- section-title ---

  const productList = getProductList(productInfoList);

  appendChildrenList(productListSection, [
    sectionTitle,
    productList,
  ]);

  return productListSection;
};
