function solution(s) {
  s = s.toLowerCase()
  return s.split(" ").map((item) => item ? item[0].toUpperCase() + item.substring(1) : "").join(" ")
}

function solution1(s) {
  let answer = ""

  s = s.toLowerCase()

  let idx = 0;

  for (let i = 0; i < s.length; i++) {
    let word = s[i];
    if (s[i] === " ") {
      idx = 0
    } else {
      if (idx === 0) {
        word = s[i].toUpperCase()
      }
      idx++
    }
    answer += word
    console.log(s[i], i, idx)
  }
  return answer
}

function solution2(s) {
  s = s.toLowerCase()
    .split(" ")
    .map((str) => {
      return str === ""
        ? str
        : str[0].toUpperCase() + str.substr(1)
    })
  return s.join(" ")
}
