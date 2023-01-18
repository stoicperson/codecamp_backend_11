const solution = (n) => Array.from(String(n)).reduce((acc, cur) => acc + +cur, 0)

function solution2(n) {
  let answer = 0;
  n = String(n)
  for (let i = 0; i < n.length; i++) {
    //answer = answer + Number(n[i])
    answer += Number(n[i])
  }
  return answer
}

function solution3(n) {
  const answer = String(n).split("").reduce((acc, cur) => {
    return acc + Number(cur)
  }, 0)
  return answer
}