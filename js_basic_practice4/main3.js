const A3 = async () => {
  const a = 'A 함수 실행 후 생기는 데이터';
  return a;
};

const B3 = (a) => {
  console.log(`${a}를 이용하는 B`);
};

A3().then((a) => {
  B3(a);
  console.log('------');
}).catch((error) => {
  console.log(error.message);
})


const func = async () => { // await는 async 함수 내부에서만 호출 가능
  const a = await A3();
  B3(a);
}

func();
