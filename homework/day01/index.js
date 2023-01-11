function checkDash(number) {
  const result = number.includes("-")
  if (!result) console.log("에러발생!!! 형식이 올바르지 않습니다.")
  return result
}

function checkNumberLength(number) {
  const [fristNum, secondNum] = number.split("-")
  if (fristNum.length !== 6 || secondNum.length !== 7) {
    console.log("에러 발생!! 개수를 제대로 입력해주세요")
    return false
  }
  return true
}
function makeNumber(number) {
  return number.substring(0, 8) + "******"
}

function customRegistrationNumber(number) {
  const hasDash = checkDash(number)
  if (!hasDash) return
  const isValid = checkNumberLength(number)
  if (!isValid) return
  const result = makeNumber(number)
  return result
}

customRegistrationNumber("2105101010101")