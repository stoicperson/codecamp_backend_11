const solution = (participant, completion) => participant.find((el) => !completion[el]--, completion.map(el => completion[el] = (completion[el] | 0) + 1))

function solution1(participant, completion) {
  const answer = {}

  for (let i = 0; i < participant.length; i++) {
    answer[participant[i]] === undefined
      ? answer[participant[i]] = 1
      : answer[participant[i]]++
  }
  for (let i = 0; i < completion.length; i++) {
    answer[completion[i]]--
  }
  for (let key in answer) {
    if (answer[key]) {
      return key
    }
  }
}

function solution2(participant, completion) {
  participant.sort()
  completion.sort()

  for (let i = 0; i < participant.length; i++) {
    if (participant[i] !== completion[i]) {
      return participant[i]
    }
  }
}

function solution3(participant, completion) {
  participant.sort()
  completion.sort()
  const answer = participant.filter((name, i) => {
    return name !== completion[i]
  })
  return answer[0]
}