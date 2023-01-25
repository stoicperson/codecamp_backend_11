function solution(n) {
  const x = Math.sqrt(n)
  return x % 1 ? -1 : (x + 1) ** 2
}

function solution1(n) {
  let answer = -1;

  for (let i = 1; i * i <= n; i++) {
    if (i * i === n) {
      // answer = i + 1;
      // return answer * answer
      // return (i + 1) * (i + 1)
      return (i + 1) ** 2
    }
  }
  return answer
}

function solution2(n) {
  let sqrt = Math.sqrt(n)
  if (Number.isInteger(sqrt)) {
    // return (sqrt + 1) * (sqrt + 1)
    // return (sqrt + 1) ** 2
    return Math.pow(sqrt + 1, 2)
  } else {
    return -1
  }
}