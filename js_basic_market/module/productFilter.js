import { makeDOMWithProperties } from "../utils/dom.js";
import { getProductList } from "./productList.js";

const MAX_PRICE = Number.MAX_VALUE;

const minPriceFilter = document.getElementById(
  "price-min-filter"
);
const maxPriceFilter = document.getElementById(
  "price-max-filter"
);
const discountFilter = document.getElementById(
  "discount-filter"
);
const filterButton = document.querySelector(
  ".product-filter-con button"
);

const convertPriceToNumber = (originalPrice) => {
  const formattedString = String(originalPrice)
    .replace("원", "")
    .replace(",", "");
  const formattedNumber = Number(formattedString);
  return isNaN(formattedNumber) ? 0 : formattedNumber;
};

const formatToPrice = (event) => {
  const value = event.target.value;
  const result = Number(value);
  if (isNaN(result)) {
    alert("숫자를 입력해주세요.");
  }

  event.target.value = `${result.toLocaleString()}원`;
};

const convertPercentToNumber = (originalValue) => {
  const formattedString = originalValue.replace("%", "");
  const formattedNumber = Number(formattedString);
  return isNaN(formattedNumber) ? 0 : formattedNumber;
};

export const setButtonEvent = (productList) => {
  filterButton.onclick = () => {
    const minPrice =
      convertPriceToNumber(minPriceFilter.value) || 0;
    const maxPrice =
      convertPriceToNumber(maxPriceFilter.value) ||
      MAX_PRICE;
    const discountRate =
      convertPercentToNumber(discountFilter.value) || 0;

    const newProductList = productList.filter(
      (productInfo) => {
        const { price, discountPercent } = productInfo;
        return (
          minPrice <= price &&
          price <= maxPrice &&
          discountRate <= discountPercent
        );
      }
    );

    const sectionDOM = document.querySelector("section");
    const originalProductListDOM = document.querySelector(
      ".product-list-con"
    );
    sectionDOM.removeChild(originalProductListDOM);

    if (newProductList.length > 0) {
      const productListDOM = getProductList(newProductList);
      sectionDOM.appendChild(productListDOM);
    } else {
      const emptyProductListDOM = makeDOMWithProperties(
        "div",
        {
          className: "product-list-con empty",
          innerHTML: "조건에 해당하는 상품이 없습니다.",
        }
      );
      sectionDOM.appendChild(emptyProductListDOM);
    }
  };
};

export const setFilterEvent = () => {
  minPriceFilter.onfocus = (event) => {
    event.target.value = convertPriceToNumber(
      event.target.value
    );
  };
  minPriceFilter.onblur = formatToPrice;
  maxPriceFilter.onfocus = (event) => {
    event.target.value = convertPriceToNumber(
      event.target.value
    );
  };
  maxPriceFilter.onblur = formatToPrice;
  discountFilter.onfocus = (event) => {
    event.target.value = convertPercentToNumber(
      event.target.value
    );
  };
  discountFilter.onblur = (event) => {
    const value = event.target.value;
    const result = Number(value);
    if (isNaN(result)) {
      alert("숫자를 입력해주세요.");
      event.target.value = 0;
      return;
    }
    if (result < 0 || 100 < result) {
      alert("0 이상 100 이하의 숫자를 입력해주세요");
      event.target.value = 0;
      return;
    }

    event.target.value = `${result}%`;
  };
};
