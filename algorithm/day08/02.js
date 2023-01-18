const solution = (x, n) => new Array(n).fill(x).map((el, index) => el + x * index)

function solution2(x, n) {
  const answer = []
  for (let i = 1; i <= n; i++) {
    answer.push(x * i)
  }
  return answer
}

function solution3(x, n) {
  const answer = new Array(n).fill(1).map((_, index) => {
    return (index + 1) * x
  })
  return answer
}