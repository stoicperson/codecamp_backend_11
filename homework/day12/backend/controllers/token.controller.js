import Token from "../models/tokenSchema.js"
import { TokenService } from "./services/token.service.js"

const tokenService = new TokenService()

export class TokenController {
  sendTokenToSMS = async (req, res) => {
    const { phone } = req.body
    const doc = await Token.findOne({ phone })
    const token = tokenService.getToken()
    tokenService.sendTokenToSMS(phone, token)
    if (doc) {
      await Token.updateOne({ phone }, { token })
    } else {
      new Token({ phone, token, isAuth: false }).save()
    }
    return res.send("핸드폰으로 인증 문자가 전송되었습니다.")
  }
  validateToken = async (req, res) => {
    const { phone, token } = req.body
    const doc = await Token.findOne({ phone })
    if (doc && doc.token === token) {
      await Token.updateOne({ phone }, { isAuth: true })
      return res.send(true)
    }
    return res.send(false)
  }

}