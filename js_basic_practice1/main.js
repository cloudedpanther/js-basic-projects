// 다 브라우저 실습
const target = document.getElementById('target');
const target2 = document.querySelector('#target2');
const targetClassList = document.getElementsByClassName('target-class');
const linkList = document.getElementsByTagName('a');

console.log(target, target2, targetClassList, linkList);

// 인접 노드 접근
const navigationMenu = document.getElementById('navigation-menu');
console.log(navigationMenu.children);
for (menu of navigationMenu.children) { // 배열이 아니고 유사배열인 컬렉션이라 forEach는 못 씀
  console.log(d.innerHTML);
}
console.log(navigationMenu.firstElementChild);
console.log(navigationMenu.lastElementChild);
console.log(navigationMenu.previousElementSibling);
console.log(navigationMenu.nextElementSibling);
console.log(navigationMenu.parentElement);

// 노드 만들기
const dom = document.createElement('div');
document.body.appendChild(dom);
const dom2 = document.createElement('div');
dom2.innerHTML = '마무리';
document.body.insertBefore(dom2, dom);

// DOM 변경하기
const testDiv = document.getElementById('test');
testDiv.innerHTML = '테스트용 수정';
testDiv.style.color = 'red';
testDiv.hidden = true;

const testInput = document.getElementById('test-input');
testInput.value = "자동으로 입력";
