fetch('./sample.json')
.then(async (result) => {
  if (result.ok) {
    const body = await result.json();
    console.log(body);
  }
});
// json은 이후에 배움

fetch('https://ohou.se')
.then((res) => {
  console.log('success');
});

