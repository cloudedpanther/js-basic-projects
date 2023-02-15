import { getProductList } from './module/productList.js';
import { setFilter } from './module/productFilter.js';
import { fetchSectionListData } from './module/fetch.js';

const sectionInfoList = await fetchSectionListData();

const productList = sectionInfoList.reduce((prev, curr) => {
  return [
    ...prev,
    ...curr?.productList,
  ];
}, []);
const section = document.getElementsByTagName('section')[0];
const productListDOM = getProductList(productList);
section.appendChild(productListDOM);

setFilter(productList);
