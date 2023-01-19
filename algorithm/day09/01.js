function solution(s) {
  s = s.toLowerCase()
  let y = 0, p = 0
  for (let i of s) {
    if (i === 'p') {
      p++
    } else if (i === 'y') {
      y++
    }
  }
  return y === p;
}

function solution2(s) {
  s = s.toLowerCase()
  let p = 0; let y = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "p") {
      p++;
    } else if (s[i] === "y") {
      y++
    }
  }
  return p === y
}

function solution3(s) {
  const check = {}; // 알파벳의 개수를 정리하는 객체

  const answer = s.toLowerCase().split("")
    .forEach((str) => {
      check[str] === undefined ? check[str] = 1 : check[str] += 1
    })
  return check["p"] === check["y"]
}