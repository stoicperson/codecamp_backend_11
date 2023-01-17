const solution = (seoul) => `김서방은 ${seoul.indexOf("Kim")}에 있다`

function solution2(seoul) {
  let x = 0
  for (let i = 0; i < seoul.length; i++) {
    if (seoul[i] === 'Kim') {
      // x = i;
      return x = i
      // break;
    }
  }
  return `김서방은 ${x}에 있다`
}

function solution3(seoul) {
  const x = seoul.indexOf("Kim");
  return `김서방은 ${x}에 있다`
}