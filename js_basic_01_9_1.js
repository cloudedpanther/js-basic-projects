const person = {
	name: '아무개', // 프로퍼티
  something: '',
  talk: (sentence) => { // 메서드
    console.log(sentence);
  },
  obj: {
    changed: false,
  }
};

const person2 = person;
person2.name = '이유정';
person.talk(`제 이름은 ${person.name}입니다.`); // person도 변경됨

const person3 = Object.assign({}, person); // 값 복사
person3.name = '오유진';
person.talk(`제 이름은 ${person.name}입니다.`); // person 변경 안됨

person3.obj.changed = true;
console.log(person.obj.changed); // 내부의 obj 프로퍼티는 주소 참조 중
