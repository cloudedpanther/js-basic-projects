let a = 2;
const makeNumber = function (value = 10000){ // 초기값
  // 숫자가 아니거나 0보다 작으면 0으로 return, 넘겨진 value를 숫자형으로 만들어서 return
  if (value < 0) return 0; // early return
  
  let a = 1;
  // console.log(a); // 지역변수가 전역변수를 가림

  const newValue = Number(value);
  return isNaN(newValue) ? 0 : newValue;
};

console.log(makeNumber(0));
console.log(makeNumber(undefined));
console.log(makeNumber(null));
console.log(makeNumber('23'));

// console.log(value, newValue); // 지역변수 접근 불가 
console.log(a); // 2 -> 전역 변수만 접근 가능
