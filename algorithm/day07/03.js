const solution = (s) => (s.length === 4 || s.length === 6) && !Number.isNaN(-s) && !s.includes('e')

function solution2(s) {
  // 예외처리: 4글자 또는 6글자가 아닐 경우에는 바로 false를 리턴한다.
  if (s.length !== 4 && s.length !== 6) {
    // 1, 2, 3, 5, 7, 8글자일 경우
    return false
  }
  for (let i = 0; i < s.length; i++) {
    if (Number.isNaN(Number(s[i]))) {
      // NaN 값인 경우 (=== 숫자가 아닌 경우)
      return false
    }
  }
  return true
}

function solution3(s) {
  // 예외처리: 4글자 또는 6글자가 아닐 경우에는 바로 false를 리턴한다.
  if (s.length !== 4 && s.length !== 6) {
    // 1, 2, 3, 5, 7, 8글자일 경우
    return false
  }

  const answer = s.split("").filter(el => {
    // 데이터가 숫자가 아닌 문자타입만 남긴다.
    // NaN 값인 데이터만 남긴다.
    return Number.isNaN(Number(el));
  })
  return answer.length === 0
}