function solution(s) {
  return s.split(" ").map((item) => {
    let str = ""
    for (let i in item) {
      str += (i % 2) ? item[i].toLowerCase() : item[i].toUpperCase()
    }
    return str
  }).join(" ")
}

function solution2(s) {
  let answer = ''
  let idx = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === " ") {
      answer += " "
      idx = 0
    } else {
      answer += idx & 2 ? s[i].toLowerCase() : s[i].toUpperCase()
      idx++
    }
  }
  return answer
}

function solution3(s) {
  const answer = s.split(" ").map((word) => {
    return word.split("").map((letter, i) => {
      return i % 2 ? letter.toLowerCase() : letter.toUpperCase()
    }).join("")
  }).join(" ")
  return answer
}