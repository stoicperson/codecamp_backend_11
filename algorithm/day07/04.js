function solution(n) {
  let sum = 0
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i == 0) {
      if (parseInt(n / i, 10) == i) sum += i;
      else sum += i + parseInt(n / i, 10);
    }
  }
  return sum
}

function solution2(n) {
  let answer = 0;
  for (let i = 1; i <= n; i++) {
    if (!(n % i)) {
      answer += i
    }
  }
  return answer
}

function solution3(n) {
  let answer = n;
  for (let i = 1; i <= n / 2; i++) {
    if (n % i === 0) answer += i
  }
  return answer
}

function solution4(n) {
  const answer = new Array(10).fill(1).reduce((acc, cur, i) => {
    const num = cur + i;
    return acc + (n % num
      ? 0    // 약수가 아닐 경우 
      : num  // 약수가 맞을 경우
    )
  })
  return answer
}