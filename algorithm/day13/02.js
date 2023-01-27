function solution(a, b) {
  return ((Math.abs((a - b)) + 1) * (a + b)) / 2
}

function solution1(a, b) {
  let answer = 0

  if (a === b) {
    return a;
  }

  // const start = a > b ? b : a
  const start = Math.min(a, b)

  // const end = a > b ? a : b
  const end = Math.max(a, b)

  for (let i = start; i <= end; i++) {
    answer += i
  }
  return answer
}

function solution2(numbers) {
  if (a === b) {
    return a;
  }

  const min = Math.min(a, b);
  const max = Math.max(a, b);

  const answer = new Array(max - min)
    .fill(1)
    .reduce((acc, cur, i) => {
      const num = (min + cur) + i;

      return acc + num;
    }, min)
  return answer;
}