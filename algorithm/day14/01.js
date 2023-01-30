const solution = (a, b) => a.reduce((acc, cur, index) => acc + cur * b[index], 0)

function solution1(a, b) {
  let answer = 0;
  for (let i = 0; i < a.length; i++) {
    answer += (a[i] * b[i])
  }
  return answer
}

function solution2(a, b) {
  const answer = a.reduce((acc, cur) => {
    return acc + (cur * b[i])
  }, 0)
  return answer
}