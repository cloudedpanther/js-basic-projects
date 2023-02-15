const products = {
  date: new Date('2022-07-16T00:00:00'),
  names: ["가지", "오이", "파프리카", "당근"],
  buyAll : function () {
    const buy = (name) => {
      // this -> products
      console.log(this);
      console.log(`${this.date.toLocaleString()}에 ${name}을 구매합니다.`);
    }
    const buy2 = function (name) {
      // this -> 전역 객체
      console.log(this);
      console.log(`${this.date.toLocaleString()}에 ${name}을 구매합니다.`);
    }

    this.names.forEach((name) => {
      buy(name); // no Error -> this가 원래 없음 -> 상위 this인 products 할당
      buy2(name); // Error -> 호출한 객체가 없음 -> this에 전역 객체 할당
    })
  }
};

products.buyAll();
