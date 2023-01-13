const arr = [100, 20, 40, 3, 5]

//map 매서드

arr.map((el) => {
  return el
})

//filter 매서드

arr.filter((el) => {
  //boolean 데이터를 받음
  return el % 2 === 0
})

//sort 매서드

arr.sort((a, b) => {
  return a - b
})

let str = 'abcde'

//slice
str.slice(2, 4);

//substring
str.substring(2, 4);

//split
str.split('')

//join
arr.join('-')

//reduce
arr.reduce((acc, cur) => acc + cur)

