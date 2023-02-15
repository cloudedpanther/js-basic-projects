const obj = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  }
};

const obj2 = Object.assign({}, obj);
obj2.b.c = 0;
console.log(obj); // 0으로 바뀌어있음

const deepCopy = (origin) => {
  const result = {};
  for (let key in origin) {
    if (origin[key] != null && typeof origin[key] === "object") {
      result[key] = deepCopy(origin[key]);
    } else {
      result[key] = origin[key];
    }
  }
  return result;
}

const obj3 = deepCopy(obj);
obj3.b.c = -1;
console.log(obj);
console.log(obj3);
