function solution(arr, divisor) {
  arr = arr.filter(item => !(item % divisor)).sort((a, b) => a - b)
  return arr[0] ? arr : [-1]
}

function solution2(arr, divisor) {
  const answer = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % divisor === 0) {
      answer.push(arr[i])
    }
  }
  return answer.length === 0 ? [-1] : answer.sort((a, b) => { return a - b })
}

function solution3(arr, divisor) {
  const answer = arr.filter(num => {
    return num % divisor === 0
  })
  return answer.length === 0 ? [-1] : answer.sort((a, b) => { return a - b })
}