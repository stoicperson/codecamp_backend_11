function solution(n, m) {
  // 최대공약수: 두 개 이상의 수가 공통으로 가지는 약수 중에서 가장 큰 수
  // 최소공배수: 두 개 이상의 수가 공통으로 가지는 배수 중에서 가장 작은 수

  // 최대공약수 구하기
  let max = 0;
  for (let i = 1; i <= m; i++) {
    if (n % i === 0 && m % i === 0) {
      max = i;
    }
  }
  // 최소공배수 구하기
  let min = 0;
  for (let i = m; i <= n * m; i += m) {
    if (i % n === 0) {
      min = i;
      break
    }
  }
  return [max, min];
}

function solution(n, m) {
  // 유클리드 호재법
  // - 최대공약수를 구하기 위한 알고리즘(공식)

  // 1. a를 b로 나누었을 때(a > b, 큰 수를 다 작은 수로 나누었을 때)
  // 2. 나머지 값은 c
  // 3. c가 0이라면, b가 최대공약수
  // 4. c가 0이 아니라면, b를 c로 나눠준다. (1번 과정부터 반복)

  let a = Math.max(n, m);
  let b = Math.min(n, m);
  let c = 0;

  while (a % b > 0) {
    c = a % b
    a = b
    b = c
  }

  return [b, (n * m) / b]

}