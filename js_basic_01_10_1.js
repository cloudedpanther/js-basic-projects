const colors = ['red', 'blue', 'green', 'pink', 'mint'];

const lastColor = colors.pop(); // 뒤에서 
console.log(`${lastColor} popped`); // mint

colors.push('purple'); // 뒤에 넣기
console.log(colors); // [ 'red', 'blue', 'green', 'pink', 'purple' ]

const firstColor = colors.shift(); // 앞에서
console.log(`${firstColor} shift`); // red
console.log(colors); // [ 'blue', 'green', 'pink', 'purple' ]



colors.length = 2; // length 조절로 요소 삭제도 가능
console.log(colors); // [ 'blue', 'green' ]
for(let color of colors) {  // for-of로 배열 요소 순차적 조회 가능
  console.log(color);
}
colors.forEach((color) => { // forEach는 따로 반환하는 값이 없음
  console.log(color);
})

const newColors = colors.map((color) => `new ${color}`); // map은 내부 함수에서 반환하는 값을 모아서 배열을 다시 만든 후 반환해줌
console.log(newColors);
console.log();

console.log(newColors); // [ 'new blue', 'new green' ]
const [, newGreen] = newColors; // 구조분해할당 -> 2번째 변수만 받고 싶을 때
console.log(newGreen);
