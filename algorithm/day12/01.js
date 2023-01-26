function solution(num) {
  let i = 0
  while (i < 500) {
    if (num === 1) {
      return i
    }
    if (num % 2) {
      num = num * 3 + 1
    } else {
      num = num / 2
    }
    i++
  }
  return -1
}

function solution1(num) {
  let answer = 0
  for (let i = 0; i < 500; i++) {
    if (num === 1) {
      return answer
    }
    answer++
    if (num % 2 === 0) {
      //짝수인 경우
      num = num / 2
    } else {
      num = num * 3 + 1
    }
  }
  return -1
}

function solution2(num) {
  let answer = 0

  new Array(500).fill(1).forEach(() => {
    if (num !== 1) {
      answer++
      num = num % 2 === 0 ? num / 2 : (num * 3) + 1
    }
  })
  return num !== 1 ? -1 : answer
}