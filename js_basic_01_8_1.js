funcA();
// funcB(); // Error
// funcC(); // Error

function funcA () { // 미리 생성
  console.log('function B');
}
const funcB = function(){ // 코드 실행 시 생성
  console.log('function A');
}
const funcC = () => { // 코드 실행 시 생성
  console.log('function A');
}
