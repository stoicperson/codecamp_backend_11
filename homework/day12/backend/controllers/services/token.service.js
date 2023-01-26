import coolsms from "coolsms-node-sdk"
const mysms = coolsms.default

export class TokenService {
  getToken = () => {
    const token = String(Math.floor(Math.random() * 1000000)).padStart(6, '0')
    return token
  }
  sendTokenToSMS = async (phoneNumber, token) => {
    const messageService = new mysms(process.env.SMS_KEY, process.env.SMS_SECRET)
    const result = await messageService.sendOne({
      to: phoneNumber,
      from: process.env.SMS_SENDER,
      text: `[코드캠프] 안녕하세요?! 요청하신 인증번호는 ${token} 입니다.`
    })
    console.log(result)
  }
}