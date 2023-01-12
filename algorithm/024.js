function countLetter(str) {
  let count = 0
  // str = str.toLowerCase()
  for (let i = 0; i < str.length; i++) {
    if (str[i] === 'a' || str[i] === 'A') count++
  }
  return count
}