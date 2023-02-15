import { getProductCard } from "./module/productCard.js";

const sectionDOM = document.querySelector(
  ".product-list-section"
);

const productCard = getProductCard({
  id: 1,
  imgSrc: "/js_basic_market/public/assets/파프리카.jpg",
  name: "파프리카 2입",
  discountPercent: 20,
  price: 2000,
  originalPrice: 2500,
});

sectionDOM.appendChild(productCard);
