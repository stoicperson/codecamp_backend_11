const myShopping = [
  { category: "과일", price: 12000 },
  { category: "의류", price: 10000 },
  { category: "의류", price: 20000 },
  { category: "장난감", price: 9000 },
  { category: "과일", price: 5000 },
  { category: "의류", price: 10000 },
  { category: "과일", price: 8000 },
  { category: "의류", price: 7000 },
  { category: "장난감", price: 5000 },
  { category: "의류", price: 10000 },
]

function printResult(list) {
  let amount = 0, count = 0, grade
  for (let i of list) {
    if (i.category === "의류") {
      amount += i.price
      count++
    }
  }
  if (count > 4) {
    grade = 'Gold'
  } else if (count > 2) {
    grade = 'Silver'
  } else {
    grade = 'Bronze'
  }
  return `의류를 구매한 횟수는 총 ${count}회 금액은 ${amount}원이며 등급은 ${grade}`
}

// function printResult(list) {
//   let count = 0;
//   let amount = 0;
//   let grade = '';
//   for (let i = 0; i < list.length; i++) {
//     if (list[i].category === '의류') {
//       count++
//       amount = list[i].price
//     }
//   }
//   if (5 <= count) {
//     grade = 'Gold'
//   } else if (3 <= count) {
//     grade = 'Silver'
//   } else {
//     grade = 'Bronze'
//   }
//   return `의류를 구매한 횟수는 총 ${count}회 금액은 ${amount}원이며 등급은 ${grade}`
// }

printResult(myShopping)
