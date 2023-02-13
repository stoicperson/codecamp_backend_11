function solution(d, budget) {
  let answer = 0
  d.sort((a, b) => a - b)
  for (let i of d) {
    budget -= i
    if (budget < 0) break
    answer++
  }
  return answer;
}

function solution1(d, budget) {
  let answer = 0

  d.sort((a, b) => a - b)

  let sum = 0
  for (let i = 0; i < d.length; i++) {
    sum += d[i]

    if (sum <= budget) {
      answer++
    }
  }

  return answer
}

function solution2(d, budget) {
  d.sort((a, b) => a - b)

  let answer = 0;

  while (budget - d[answer] >= 0) {
    budget -= d[answer]
    answer++;
  }
  return answer
}

function solution3(d, budget) {
  const answer = d.sort((a, b) => a - b).filter(money => {
    budget -= money
    if (budget >= 0) {
      return money
    }
  })

  return answer.length
}