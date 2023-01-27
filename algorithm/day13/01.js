const solution = (numbers) => 45 - numbers.reduce((acc, cur) => acc + cur)

function solution1(numbers) {
  let answer = 0;
  for (let i = 1; i <= 9; i++) {
    if (!numbers.includes(i)) {
      answer += i
    }
  }
  return answer
}

function solution2(numbers) {
  const answer = new Array(9)
    .fill(1)
    .reduce((acc, cur, i) => {
      const num = cur + i
      return acc + (
        numbers.includes(num)
          ? 0
          : num
      )
    }, 0)
  return answer
}