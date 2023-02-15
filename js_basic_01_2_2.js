console.log(0 == '0'); // true -> 비교 연산자
console.log(0 === '0'); // false

console.log(0 === false); // false -> 생각해줘야 하는 경우가 많아서 웬만하면 === 로 비교하기
console.log(0 == false); // true

x = 1;
y = 2;

console.log(x > y); // false

console.log(y++); // 2 -> 증감 연산자
console.log(y); // 3
console.log(++y); // 4
console.log(y); // 4

console.log(x > 0 && x < 3); // true -> 논리 연산자
console.log(x > 1 || x < 1); // false

console.log(!(x > y)); // true -> 괄호 우선순위, 부정 연산자
