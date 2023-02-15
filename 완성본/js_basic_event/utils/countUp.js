export const countUp = (dom, target, second, term = 15) => {
  if (!dom || isNaN(Number(target)) || isNaN(Number(second))) return;
  const countTerm = Math.floor((target / second) / (1000 / term));

  // target / second -> 1초에 몇씩 증가할 지
  // term초에 몇씩 증가할까요?
  // second -> 초, term -> 밀리 초
  
  let nowNum = 0;

  const timerId = setInterval(() => {
    if (nowNum > target) {
      nowNum = target;
      clearInterval(timerId);
    }

    dom.innerHTML = `${nowNum.toLocaleString()}`;
    nowNum += countTerm;
  }, term);
};
