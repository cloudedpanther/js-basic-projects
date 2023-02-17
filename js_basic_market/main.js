import { fetchSectionListData } from "./module/fetch.js";
import { getProductSection } from "./module/productSection.js";

try {
  const sectionInfoList = await fetchSectionListData();

  sectionInfoList.forEach((sectionInfo) => {
    const { sectionTitle, productList } = sectionInfo;
    const productSectionDOM = getProductSection(
      sectionTitle,
      productList
    );
    document.body.appendChild(productSectionDOM);
  });
} catch (error) {
  console.log(error);
}
