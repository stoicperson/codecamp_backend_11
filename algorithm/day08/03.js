const solution = (s) => Array.from(s).sort((a, b) => a < b ? 1 : -1).join("")

function solution2(s) {
  const answer = [];
  for (let i = 0; i < s.length; i++) {
    answer.push(s[i])
  }
  answer.sort((a, b) => { return a > b ? -1 : 1 })
  return answer.join("")
}

function solution3(s) {
  const answer = s.split("").sort((a, b) => { return a > b ? -1 : 1 }).join("")
  return answer
}