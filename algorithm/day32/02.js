function solution(s) {
  let length = s.length, open = 0
  for (let i = 0; i < length; ++i) {
    if (s[i] === "(") {
      ++open
    } else {
      --open
    }
    if (open < 0) {
      return false
    }
  }
  return !open
}