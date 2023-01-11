function checkPhone(phoneNumber) {
  if (phoneNumber.length < 10 || phoneNumber.length > 11) {
    console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해주세요!!")
    return false
  } else {
    return true
  }
}
function getToken() {
  const token = String(Math.floor(Math.random() * 1000000)).padStart(6, '0')
  console.log(token)
  return token
}
function sendTokenToSMS(phoneNumber, token) {
  console.log(phoneNumber + "번호로" + token + "를 전송합니다.")
}
function createTokenOfPhone(phoneNumber) {
  const isValid = checkPhone(phoneNumber)
  if (!isValid) return
  const token = getToken()
  sendTokenToSMS(phoneNumber, token)
}

createTokenOfPhone("01012345678")