const solution = (s, n) => s.split("").map((el) => {
  if (el === " ") return " "
  let code = el.charCodeAt()

  if (code < 91) {
    if (code + n > 90) {
      code = code - 26
    }
  } else {
    if (code + n > 122) {
      code = code - 26
    }
  }
  return String.fromCharCode(code + n)
}).join("")

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function solution1(s, n) {
  let answer = "";

  for (let i = 0; i < s.length; i++) {
    if (s[i] === " ") {
      answer += " "
    } else {
      let idx = alphabet.indexOf(s[i]);
      const word = idx > 25 ? alphabet.slice(26) : alphabet.slice(0, 26)

      idx = word.indexOf(s[i]) + n

      if (idx > 25) {
        idx -= 26
      }

      answer += word[idx]
    }
  }

  return answer
}

const lower = "abcdefghijklmnopqrstuvwxyz";

const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function solution2(s, n) {
  if (s[i] === " ") {
    answer += " "
  } else {
    const word = lower.includes(s[i]) ? lower : upper
    let idx = word.indexOf(s[i]) + n

    if (idx > 25) {
      idx -= 26
    }

    answer += word[idx]
  }
}

function solution3(s, n) {
  const answer = s.split("").reduce((acc, cur) => {
    const word = lower.includes(cur) ? lower : upper;
    let idx = word.indexOf(cur);
    return acc + cur === " " ? " " : word[idx > 25 ? idx - 26 : idx]
  }, "")
  return answer
}

function solution4(s, n) {
  let answer = "";

  for (let i = 0; i < s.length; i++) {
    if (s[i] === " ") {
      answer += " "
    } else {
      let idx = s[i].charCodeAt() + n;

      if (idx > 122 || (idx > 90 && (idx - n) < 97)) {
        idx -= 26;
      }

      answer += String.fromCharCode(idx);
    }
  }
  return answer
}