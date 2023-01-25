function solution(arr) {
  arr.splice(arr.indexOf(Math.min.apply(null, arr)), 1)
  return arr.length ? arr : [-1]
}

function solution1(arr) {
  const answer = []

  //1. 제일 작은 수 찾기
  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i]
    }
  }

  //2. 제일 작은 수를 제외한 숫자만 배열에 추가
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== min) {
      answer.push(arr[i])
    }
  }

  return answer.length === 0 ? [-1] : answer
}

function solution2(arr) {
  const min = Math.min(...arr)

  const answer = arr.filter((num) => {
    return num !== min
  })

  return answer.length === 0 ? [-1] : answer
}