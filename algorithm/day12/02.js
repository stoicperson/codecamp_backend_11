function solution(numbers) {
  var answer = [];
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i !== j) answer.push(numbers[i] + numbers[j])
    }
  }
  return [...new Set(answer)].sort((a, b) => a - b)
}

function solution2(numbers) {
  const answer = [];

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const sum = numbers[i] + numbers[j]
      if (!answer.includes(sum)) {
        answer.push(sum)
      }
    }
  }
  return answer.sort((a, b) => a - b)
}

function solution3(numbers) {
  const answer = new Set([]);

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const sum = numbers[i] + numbers[j]
      answer.add(sum)
    }
  }
  // return Array.from(answer).sort((a, b) => a - b)
  return [...answer].sort((a, b) => a - b)
}

// Set 

const set = new Set([]);

// 1. 배열 형태를 가지는 객체 데이터
typeof set; //object

typeof [];  //object

Array.isArray([]);  //true
Array.isArray(set); //false

// 2. 고유한 값만 저장 (중복 데이터 x)

// 데이터 추가
set.add();
// 데이터 삭제
set.delete(2);  // 정상적으로 삭제하면 => true 아니면 => false
// 데이터 조회
set.has();      // 데이터 존재하면 => true 아니면 => false
// 데이터 길이
set.size();
// 데이터 리셋
set.clear();
// forEach;
set.forEach((el) => {
  console.log(el)
})

//배열로 변환;
const arr = Array.from(set)
const arr2 = [...set]

function solution4(numbers) {
  const answer = new Set([]);
  numbers.forEach((num1, i) => {
    numbers.slice(i + 1).forEach((num2) => answer.add(num1 + num2))
  })
  return [...answer].sort((a, b) => a - b)
}