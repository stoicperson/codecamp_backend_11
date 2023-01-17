const solution = (s) => s.substring((s.length - 1) / 2, s.length % 2 ? (s.length + 1) / 2 : s.length / 2 + 1)

function solution2(s) {
  // 글자 길이를 2로 나눈 값을 저장 (홀수일 경우에는 소수점까지 제거 - 내림 처리)
  const center = Math.floor(s.length / 2);
  let answer = s[center];

  // 짝수 길이를 가지는 문자열일 경우 (추가 작업이 들어간다.)
  if (s.length & 2 === 0) {
    // 짝수일 경우에는 가운데 2글자를 가져온다.
    answer = s[center - 1] + answer
  }
  return answer
}

function solution3(s) {
  //글자 갈이를 2로 나눈 값을 저장(홀수일 경우에는 소수점까지 제거 - 내림 처리)
  const center = Math.floor(s.length / 2);

  return s.length % 2 === 1
    ? s[center]                              // true일 경우 (길이가 홀수일 경우)
    : s.substring(center - 1, center + 1)    // false일 경우 (길이가 짝수일 경우)
}
