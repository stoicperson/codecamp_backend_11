function random() {
  let number = 50
  const randomNum = Math.floor(Math.random() * 100) + 1
  console.log(randomNum)
  if (number === randomNum) {
    return 'Draw'
  } else if (number > randomNum) {
    return 'Lose'
  } else {
    return 'Win'
  }
}

random()