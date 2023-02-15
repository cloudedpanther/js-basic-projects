const person = {
	name: '아무개', // 프로퍼티
  something: '',
  talk: (sentence) => { // 메서드
    console.log(sentence);
  }
};

person.talk(`제 이름은 ${person.name}입니다.`); // 점표기법으로 접근

person.name = '우희은';
person.talk(`제 이름은 ${person.name}입니다.`);

console.log('something' in person); // 프로퍼티 존재 유무 확인
person.something = undefined; 
console.log(person); // 프로퍼티가 삭제되진 않음
delete person.something; // 프로퍼티 삭제

for (let key in person) { // 반복
  console.log(key);
}

// console.log(person.address.city); // TypeError: Cannot read properties of undefined Error
console.log(person.address?.city); // undefined -> 옵셔널 체이닝

const { address } = person; // 구조 분해 할당
console.log('address', address);
