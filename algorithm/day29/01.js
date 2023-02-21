function solution(numbers, hand) {
  const position = [[1, 3], [0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [0, 2], [1, 2], [2, 2]]
  const temp = [[0, 3], [2, 3]]
  hand = hand[0].toUpperCase()
  return numbers.map((el) => {
    const number = position[el]
    if (/[147]/.test(el)) {
      temp[0] = number
      return 'L'
    } else if (/[369]/.test(el)) {
      temp[1] = number
      return 'R'
    } else {
      const [left, right] = temp.map((el) => Math.abs(number[0] - el[0]) + Math.abs(number[1] - el[1]))
      if (left > right) {
        temp[1] = number
        return 'R'
      } else if (right > left) {
        temp[0] = number
        return 'L'
      } else {
        if (hand === 'L') {
          temp[0] = number
        } else {
          temp[1] = number
        }
        return hand
      }
    }
  }).join("")
}