const solution = (absolutes, signs) => absolutes.reduce((acc, cur, index) => acc + cur * (signs[index] ? 1 : -1), 0)

function solution1(absolutes, signs) {
  let answer = 0;

  for (let i = 0; i < absolutes.length; i++) {
    answer += signs[i] ? absolutes[i] : -absolutes[i]
  }

  return answer
}

function solution2(absolutes, signs) {
  const answer = absolutes.reduce((acc, cur, index) => {
    return acc + (signs[index]
      ? cur
      : -cur)
  }, 0)
  return answer
}