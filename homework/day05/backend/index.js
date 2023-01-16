import express from "express"
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { options } from "./swagger/config.js"
import cors from "cors"

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

app.listen(3000)

