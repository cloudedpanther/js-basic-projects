/**
 *
 * @param {innertHTML이 갱신될 노드} dom
 * @param {목표 숫자} target
 * @param {총 몇 초가 걸릴 지} second
 * @param {몇 초마다 증가할 지} term
 *
 * @param {term마다 얼마씩 증가할 지} countTerm
 */
export const countUp = (dom, target, second, term = 15) => {
  if (!dom || isNaN(target) || isNaN(second) || isNaN(term))
    return;

  const countTerm = Math.floor(
    (target / second) * (term / 1000)
  );

  let nowNumber = 0;

  const timerID = setInterval(() => {
    nowNumber += countTerm;

    if (nowNumber >= target) {
      nowNumber = target;
      clearInterval(timerID);
    }

    dom.innerHTML = nowNumber.toLocaleString();
  }, term);
};
