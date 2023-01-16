const solution = (num) => num % 2 ? "Odd" : "Even"

function solution2(num) {
  if (num % 2 === 0) {
    return "Even"
  } else {
    return "Odd"
  }
}

function solution3(num) {
  return num % 2 === 0 ? "Even" : "Odd"
}