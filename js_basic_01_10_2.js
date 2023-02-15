const fruits = {
  apple: 2000,
  mango: 5000,
  orange: 1500,
  grape: 4000,
  kiwi: 8000
};

Object.keys(fruits).forEach((fruitName) => {
  console.log(fruitName);
})
Object.values(fruits).forEach((price) => {
  console.log(price);
})
Object.entries(fruits).forEach((fruit) => {
  console.log(fruit);
})
