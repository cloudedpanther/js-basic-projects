const A2 = () => new Promise((resolve, reject) => {
  const a = 'A 함수 실행 후 생기는 데이터';
  resolve(a);
});

const B2 = (a) => {
  console.log(`${a}를 이용하는 B`);
};

A2().then((a) => {
  B2(a);
}).catch((error) => {
  console.log(error.message);
})

