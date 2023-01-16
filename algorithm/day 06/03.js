const solution = (arr) => arr.reduce((acc, cur) => acc + cur) / arr.length

function solution2(arr) {
  // 국어 90, 수학 70, 영어 80, 과학 60

  // (90 + 70 + 80 + 60) / 4
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum / arr.length
}

function solution3(arr) {
  const sum = arr.reduce((acc, cur) => {
    return acc + cur
  })
  return sum / arr.length
}