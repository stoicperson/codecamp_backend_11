function solution(x) {
  return !(x % ([...String(x)].reduce((acc, cur) => acc + +cur, 0)))
}

function solution1(x) {
  let sum = 0;
  x = String(x);
  for (let i = 0; i < x.length; i++) {
    sum += Number(x[i]);
  }
  return x % sum === 0;
}

function solution2(x) {
  const sum = x.toString().split('').reduce((acc, cur) => acc + +cur, 0)
  return x % sum === 0;
}

