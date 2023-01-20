import coolsms from "coolsms-node-sdk"
const mysms = coolsms.default

export function checkPhone(phoneNumber) {
  if (phoneNumber.length < 10 || phoneNumber.length > 11) {
    console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해주세요!!")
    return false
  } else {
    return true
  }
}
export function getToken() {
  const token = String(Math.floor(Math.random() * 1000000)).padStart(6, '0')
  console.log(token)
  return token
}
export async function sendTokenToSMS(phoneNumber, token) {
  const messageService = new mysms(process.env.COOL_SMS_API_KEY, process.env.COOL_SMS_API_SECRET)
  const result = await messageService.sendOne({
    to: phoneNumber,
    from: "01049013019",
    text: `[코드캠프] 안녕하세요?! 요청하신 인증번호는 ${token} 입니다.`
  })
  console.log(result)
}
