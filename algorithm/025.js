function makeNumber(num) {
  let str = '';
  for (let i = 1; i <= num; i++) {
    str += `-${i}`
  }
  return str.substring(1)
}
