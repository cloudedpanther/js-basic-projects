import { fetchSectionListData } from "./module/fetch.js";
import {
  setButtonEvent,
  setFilterEvent,
} from "./module/productFilter.js";
import { getProductList } from "./module/productList.js";

const sectionInfoList = await fetchSectionListData();

const productList = sectionInfoList.reduce(
  (acc, cur) => [...acc, ...cur.productList],
  []
);

const sectionDOM = document.querySelector("section");
const productListDOM = getProductList(productList);
sectionDOM.appendChild(productListDOM);

setFilterEvent();
setButtonEvent(productList);
