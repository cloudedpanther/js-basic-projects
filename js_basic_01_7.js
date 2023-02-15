for (let day = 1; day < 5; day++) {
  console.log(`${day}일 지났음`);
}

let day2 = 5;
while (day2) {
  console.log(`day2 D-${day2}`);
  day2--;
}

let day3 = 0;
do{
  console.log(`day3 D-${day3}`);
  day3--;
} while (day3 > 0);


for (let day4 = 5; day4; day4--) {
  if (day4 === 3) continue;
  if (day4 === 1) break;
  console.log(`day4 D-${day4}`);
}
