function solution(dartResult) {
  const scores = []
  const bonus = {
    'S': 1,
    'D': 2,
    'T': 3
  }

  for (let i = 0; i < 3; i++) {

    let score = parseInt(dartResult)
    dartResult = dartResult.slice((score + "").length)
    score **= bonus[dartResult[0]]
    dartResult = dartResult.slice(1)
    if (dartResult[0] === '*') {
      if (i > 0) {
        scores[i - 1] *= 2
      }
      score *= 2
      dartResult = dartResult.slice(1)
    } else if (dartResult[0] === '#') {
      score *= -1
      dartResult = dartResult.slice(1)
    }
    scores.push(score)
  }
  return scores.reduce((acc, cur) => acc + cur)
}

function solution1(dartResult) {
  const answer = []

  let score = ""
  let bonus = ['S', 'D', 'T']
  let option = ['#', '*']
  for (let i = 0; i < dartResult.length; i++) {
    if (!isNaN(dartResult[i])) {
      score += dartResult[i]
    } else {
      if (bonus.includes(dartResult[i])) {
        if (dartResult[i] === 'S') {
          score = Math.pow(score, 1)
        } else if (dartResult[i] === 'D') {
          score = Math.pow(score, 2)
        } else {
          score = Math.pow(score, 3)
        }
        answer.push(score);
        score = "";
      } else if (option.includes(dartResult[i])) {
        if (dartResult[i] === '#') {
          answer[answer.length - 1] *= -1
        } else {
          answer[answer.length - 1] *= 2
          if (answer.length > 1) {
            answer[answer.length - 2] *= 2
          }
        }
      }
    }
  }

  return answer.reduce((acc, cur) => acc + cur)
}