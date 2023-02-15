const a = 1; // number
const b = 101111n; // BigInt
const name = "우희은";
const c = `hello, world. ${name}`; // string -> 백틱
const d = true; // boolean
let e; // undefined
const f = null; // object -> undefined와 null의 차이점, null은 언어 자체의 오류로 객체로 나옴. 하위 호환성을 위해 남겨둔 기능.
const g = {}; // object -> 객체
const h = function(){ // function -> 객체지만 특수하므로 따로 type이 있음

};

console.log(
  typeof a,
  typeof b,
  typeof c,
  typeof d,
  typeof e,
  typeof f,
  typeof g,
  typeof h,
);
