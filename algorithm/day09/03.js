const solution = (n) => [...String(n)].map((i) => +i).reverse()

const solutionUsedNum = (n) => {
  const answer = []
  do {
    answer.push(n % 10)
    n = Math.floor(n / 10)
  } while (n > 0)
  return answer
}

function solution2(n) {
  n = String(n)
  const answer = [];
  for (let i = n.length - 1; i >= 0; i--) {
    answer.push(Number(n[i]))
  }
  return answer
}

function solution3(n) {
  const answer = String(n).split("").reverse().map((num) => {
    return Number(num)
  })
  return answer
}