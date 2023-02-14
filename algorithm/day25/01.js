function solution(board, moves) {
  let answer = 0;
  let bucket = []
  for (let index of moves) {
    for (let el of board) {
      const a = el[index - 1]
      if (a) {
        el.splice(index - 1, 1, 0)
        if (bucket[bucket.length - 1] === a) {
          bucket.pop()
          answer += 2
        } else {
          bucket.push(a)
        }
        break
      }
    }
  }
  return answer;
}

function transpose(matrix) {
  return matrix.map((_, colIndex) => matrix.map(row => {
    return row[colIndex]
  }))
}

function solution0(board, moves) {  // 최단 시간 풀이
  let answer = 0, bucket = [];
  let stack = transpose(board).map((el) => el.filter(el => !!el))
  console.log(stack)
  let length = moves.length
  for (let i = 0; i < length; ++i) {
    let shift = stack[moves[i] - 1].shift()
    if (shift) {
      if (bucket.at(-1) === shift) {
        bucket.pop()
        answer += 2
      } else {
        bucket.push(shift)
      }
    }
  }
  return answer
}


function solution1(board, moves) {
  let answer = 0;
  let bucket = []
  for (let i = 0; i < moves.length; i++)
    for (let j = 0; j < board.length; j++) {
      const doll = borad[j][moves[i] - 1]

      if (doll) {
        board[j][moves[i] - 1] = 0
        if (doll === bucket.at(-1)) {
          bucket.pop()
          answer += 2
        }
        bucket.push(doll)
        break;
      }
    }
}

function solution2(board, moves) {
  let answer = 0;
  const bucket = [];

  moves.forEach((move) => {
    let pick = false;
    board.forEach((location) => {
      const doll = location[move - 1];
      if (pick === false) {
        if (doll !== 0) {
          location[move - 1] = 0;
          if (bucket[bucket.length - 1] === doll) {
            answer += 2
            bucket.pop()
          } else {
            bucket.push(doll)
          }
          pick = true
        }
      }
    })
  })

  return answer
}