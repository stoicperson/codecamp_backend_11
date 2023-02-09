const a = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

function solution(s) {
  for (let i = 0; i < 10; i++) {
    const reg = new RegExp(a[i], g)
    s = s.replace(reg, i)
  }
  return Number(s);
}

function solution1(s) {
  for (let i = 0; i < a.length; i++) {
    // while (s.includes(a[i])) {
    //   s = s.replace(a[i], i)
    // }
    s = s.replaceAll(a[i], i)
  }
  return Number(s);
}

function solution2(s) {
  a.forEach((num, i) => {
    s = s.split(num).join(i)
  })
  return Number(s);
}