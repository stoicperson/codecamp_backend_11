import express from "express"
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { options } from "./swagger/config.js"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"

import { checkPhone, getToken, sendTokenToSMS } from "./phone.js"
import { checkEmail, getWelcomeTemplate, sendTemplateToEmail } from "./email.js"

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.get('/users', function (req, res) {
  const result = [
    { email: "aa@aa.com", name: "영희", phone: "010-1111-1111", personal: "030101-0000000", prefer: "https://naver.com" },
    { email: "bb@bb.com`", name: "훈이", phone: "010-2222-2222", personal: "040202-0000000", prefer: "https://google.com" },
    { email: "cc@cc.com`", name: "짱구", phone: "010-3333-3333", personal: "050505-0000000", prefer: "https://youtube.com`" },
    { email: "dd@dd.com", name: "철수", phone: "010-4444-4444", personal: "060606-0000000", prefer: "https://instagram.com" },
    { email: "ee@ee.com", name: "코난", phone: "010-5555-5555", personal: "070707-0000000", prefer: "https://facebook.com" },
  ]
  res.send(result)
})
app.get('/starbucks', function (req, res) {
  const result = [
    { name: "아메리카노", kcal: 5 },
    { name: "에스프레소", kcal: 1 },
    { name: "리스트레토", kcal: 3 },
    { name: "카페라떼", kcal: 100 },
    { name: "카푸치노", kcal: 120 },
    { name: "카페모카", kcal: 200 },
    { name: "모카치노", kcal: 220 },
    { name: "캐러멜 마키아토", kcal: 300 },
    { name: "카페 화이트 모카", kcal: 240 },
    { name: "아포카토", kcal: 500 },
  ]
  res.send(result)
})
app.post("/token/phone", (req, res) => {

  const { phoneNumber } = req.body
  //1, 휴대폰번호 자릿수 맞는지 확인하기(10~11자리)
  const isValid = checkPhone(phoneNumber)
  if (!isValid) return res.send("error")

  //2. 핸드폰 토큰 6자리 만들기
  const token = getToken()

  //3. 핸드폰 번호에 토큰 전송하기
  sendTokenToSMS(phoneNumber, token)
  res.send(`토큰 발송: ${token}`)
})
app.post("/signup", (req, res) => {
  const { name, personal, phoneNum, email, site, password } = req.body
  //1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkEmail(email)
  if (!isValid) return
  //2. 가입환영 템플릿 만들기
  const template = getWelcomeTemplate({ name, phoneNum, site })
  //3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, template)
  res.send("가입완료")
})

mongoose.connect('mongodb://my-database:27017/mydocker')
  .then(() => console.log("db 접속에 성공하셨습니다"))
  .catch(() => console.log("db 접속에 실패하였습니다"))

app.listen(3000)

