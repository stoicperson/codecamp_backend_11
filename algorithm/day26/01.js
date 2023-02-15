function solution(n) {
  return parseInt(n.toString(3).split("").reverse().join(""), 3)
}

function solution1(n) {
  n = n.toString(3);

  let reverse = '';
  for (let i = n.length - 1; i >= 0; i--) {
    reverse += n[i]
  }

  return parseInt(reverse, 3)
}