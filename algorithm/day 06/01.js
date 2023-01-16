const solution = (arr) => arr.filter((el, i) => el !== arr[--i])

function solution2(arr) {
  const ansewer = []

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i + 1]) {
      ansewer.push(arr[i])
    }
  }

  return ansewer
}

function solution3(arr) {
  const answer = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== answer[answer.length - 1]) {
      answer.push(arr[i])
    }
  }

  return answer;
}