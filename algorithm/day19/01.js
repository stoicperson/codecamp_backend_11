function solution(answers) {
  var one = [1, 2, 3, 4, 5]
  var two = [2, 1, 2, 3, 2, 4, 2, 5]
  var three = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
  var oneAnswer = 0, twoAnswer = 0, threeAnswer = 0
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === one[i] || i > 4 && answers[i] === one[i % 5]) {
      oneAnswer++
    }
    if (answers[i] === two[i] || i > 7 && answers[i] === two[i % 8]) {
      twoAnswer++
    }
    if (answers[i] === three[i] || i > 10 && answers[i] === three[i % 10]) {
      threeAnswer++
    }
  }
  var max = Math.max(oneAnswer, twoAnswer, threeAnswer)
  var answer = [];
  if (max === oneAnswer) {
    answer.push(1)
  }
  if (max === twoAnswer) {
    answer.push(2)
  }
  if (max === threeAnswer) {
    answer.push(3)
  }
  return answer;
}

const answerTable = [
  [1, 2, 3, 4, 5],
  [2, 1, 2, 3, 2, 4, 2, 5],
  [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
]

function solution1(answers) {
  const score = [0, 0, 0]
  for (let i = 0; i < answers.length; i++) {
    for (let j = 0; j < answerTable.length; j++) {
      const answer = answerTable[j][i % answerTable[j].length]
      if (answer === answer[i]) {
        score[j]++
      }
    }
  }
  const biggest = Math.max(...score)
  const answer = [];
  for (let i = 0; i < score.length; i++) {
    if (score[i] === biggest) {
      answer.push(i + 1)
    }
  }
  return answer
}

function solution2(answers) {
  const scoreList = answerTable.map((el, i) => {
    const score = answers.reduce((acc, cur, j) => {
      return acc + (el[j % el.length] === cur ? 1 : 0)
    }, 0)
    return { student: i + 1, score } // socre : score
  })
  const biggest = Math.max(...scoreList.map(el => el.score))
  return scoreList.filter(el => biggest === el.score).map((el) => el.student)
}