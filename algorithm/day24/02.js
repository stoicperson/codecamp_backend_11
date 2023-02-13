function solution(n) {
  let newArr = [0, 1];
  for (let i = 2; i <= n; i++) {
    newArr[i] = BigInt(newArr[i - 1]) + BigInt(newArr[i - 2])
  }
  return newArr[n] % BigInt(1234567)
}

function solution1(n) {
  let n1 = 0, n2 = 1, n3
  for (let i = 2; i <= n; i++) {
    n3 = BigInt(n1) + BigInt(n2)
    n1 = n2
    n2 = n3
  }
  return n3 % BigInt(123456)
}

function solution2(n) {
  const answer = []

  let prev = 0
  let next = 0
  let sum = 1;

  for (let i = 2; i <= n; i++) {
    sum = (prev + next) % 1234567
    prev = next
    next = sum
    answer.push(num)
  }
  return answer[n - 2]
}