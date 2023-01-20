import express from "express"
import mongoose from "mongoose"
import Token from "./models/token.model.js"
import { getToken, sendTokenToSMS } from "./phone.js"

const app = express()

app.use(express.json())

app.post('/tokens/phone', async (req, res) => {
  const { phone } = req.body
  const doc = await Token.findOne({ phone })
  const token = getToken()
  sendTokenToSMS(phone, token)
  if (doc) {
    await Token.updateOne({ phone }, { token })
  } else {
    new Token({ phone, token, isAuth: false }).save()
  }
  return res.send(`${phone}으로 ${token} 인증 문자가 전송되었습니다.`)
})

app.patch('/tokens/phone', async (req, res) => {
  const { phone, token } = req.body
  const doc = await Token.findOne({ phone })
  if (doc && doc.token === token) {
    await Token.updateOne({ phone }, { isAuth: true })
    return res.send(true)
  }
  return res.send(false)
})

mongoose.connect('mongodb://my-mongodb:27017/mydb')
  .then(() => console.log("db 접속에 성공"))
  .catch(() => console.log("db 접속에 실패"))

app.listen(3000)