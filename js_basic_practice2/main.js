const [ count, test ] = document.getElementsByTagName('span');
// const buttonWrapper = document.getElementById('button-wrapper'); // 버블링
// const buttonSubWrapper = document.getElementById('button-subWrapper'); // 버블링
const countUpButton = document.getElementById('count-up-button');

// buttonWrapper.onclick = () => { // 버블링
//   console.log('wrapper event triggered');
// }
// buttonSubWrapper.onclick = () => {
//   console.log('subwrapper event triggered');
// }
countUpButton.onclick = (event) => {
  console.log(event);
  if (isNaN(Number(count.innerHTML))) return;
  count.innerHTML = Number(count.innerHTML)+1;
  // event.stopPropagation(); // 버블링
};



count.onmouseover = () => {
  count.style.backgroundColor = 'gray';
  count.style.color = 'white';
}
count.onmouseout = () => {
  count.style.backgroundColor = 'transparent';
  count.style.color = 'black';
}




const input = document.getElementsByTagName('input')[0];
input.onfocus = () => {
  input.value = '자동 입력';
};

const input2 = document.getElementsByTagName('input')[1];
const result = document.getElementById('result');
input2.onchange = (event) => {
  result.innerHTML = event.target.value;
}



new Array(10).fill(0).forEach((_, index) => {
  test.addEventListener('click', () => {
    console.log(`test clicked ${index+1}`);
  })
});
