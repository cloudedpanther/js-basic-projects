const A = (callback) => {
  const a = 'A 함수 실행 후 생기는 데이터';
  callback(a);
};

const B = (a) => {
  console.log(`${a}를 이용하는 B`);
};

A(B);
