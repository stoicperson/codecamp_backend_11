const solution = (arr1, arr2) => arr1.map((item, index) => item.map((el, i) => arr1[index][i] + arr2[index][i]))

function solution1(arr1, arr2) {
  const answer = []
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; arr1[i].length; j++) {
      const sum = arr1[i][j] + arr2[i][j]
      if (!answer[i]) {
        answer[i] = []
      }
      answer[i][j] = sum
    }
  }
}

function solution2(arr1, arr2) {
  const answer = arr1.map((numArr, i) => {
    return numArr.map((num, j) => {
      return num + arr2[i][j]
    })
  })
  return answer
}