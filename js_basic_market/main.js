import { getProductSection } from "./module/productSection.js";

try {
  const response = await fetch(
    "public/mock/sectionListData.json"
  );
  const data = await response.json();
  const sectionInfoList = data.sectionInfoList;

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
