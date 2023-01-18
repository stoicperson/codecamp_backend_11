const solution = (array, commands) => commands.map(([i, j, k]) => array.slice(i - 1, j).sort((a, b) => a - b)[k - 1])

function solution2() {
  const answer = []
  for (let idx = 0; idx < commands.length; idx++) {
    const i = commands[idx][0];
    const j = commands[idx][1];
    const k = commands[idx][2];
    // console.log(commands[idx], i, j, k)
    const result = array.slice(i - 1, j).sort((a, b) => a - b)
    answer.push(result[k - 1])
  }
  return answer
}

function solution3() {
  const answer = commands.map((el) => {
    const result = array.slice(el[0] - 1, el[1].sort((a, b) => a - b))
    return result[el[2] - 1]
  })
  return answer
}