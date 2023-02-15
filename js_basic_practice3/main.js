const obj = {
  property : 1,
  property2: true,
}

let result = '';
try {
  result = a.property3;
} catch (err) {
  result = '모름'; // 기본값 설정
  console.dir(err);
} finally {
  console.log(`result = ${result}`); // 에러가 안 남
}

try {
  throw new Error('이건 커스텀 에러입니다.');
} catch (err) {
  console.dir(err);
}
