function solution(a, b) {
  return new Date("2016", a - 1, b).toString().slice(0, 3).toUpperCase()
}

const month = {
  1: 31,
  2: 29,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31
}
const weekDay = ["FRI", "SAT", "SUN", "MON", "TUE", "WED", "THU"]

function solution1(a, b) {
  let answer = 0;
  for (let i = 1; i < a; i++) {
    answer += month[i]
  }
  answer += (b - 1)
  answer = answer % 7

  return weekDay[answer]
}
function solution2(a, b) {
  const days = new Array(a).fill(1).reduce((acc, cur, i) => {
    const monthNum = cur + i;
    return acc + (monthNum !== a ? month[monthNum] : b - 1)
  })
  return weekDay[days % 7]
}
function solution3(a, b) {
  const days = new Date(2016, a - 1, b).getDay();
  return weekDay[days]
}