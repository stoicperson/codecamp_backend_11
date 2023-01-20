// const express = require('express') //옛날 방식 => commonjs
import express from "express"         //요즘 방식 => module

import "dotenv/config"

import { checkEmail, getWelcomeTemplate, sendTemplateToEmail } from "./email.js"  //export 가져오기
//import express from 'express';                                   //export default 가져오기
//import aslkdjfa from 'express;                                   //export default 이름 바꿔서 가져오기
// import qqqq, {checkPhone as zzzz, getToken} from "./phone.js";  //export default와 export를 함께 쓰기

// import * as ttt from "./phone.js"                               //export 한방에 다 가져오기
// ttt.checkPhone                                                  //export 한방에 다 가져오기
// ttt.getToken                                                    //export 한방에 다 가져오기

import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { options } from "./swagger/config.js"
import cors from "cors"
import mongoose from "mongoose"
import Board from "./models/board.model.js"

const app = express()
app.use(express.json()) // 옛날에는 bodyParser 
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.get('/boards', async (req, res) => {
  // 1. DB에 접속 후, 데이터를 조회 => 데이터를 조회했다고 가정
  // const result = [
  //   { number: 1, writer: "철수", title: "제목입니다~", content: "내용입니다!" },
  //   { number: 2, writer: "영희", title: "영희입니다~", content: "영입니다!" },
  //   { number: 3, writer: "훈이", title: "훈이입니다~", content: "훈입니다!" }
  // ]
  const result = await Board.find()
  // 2. DB에서 꺼내온 결과를 브라우저에 응답(response) 주기
  res.send(result)
})

app.post('/boards', async (req, res) => {
  // 1. 브라우저에서 보내준 데이터 확인하기
  console.log(req)
  console.log("===========================")
  console.log(req.body)

  // 2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정
  const board = new Board({
    writer: req.body.writer,
    title: req.body.title,
    contents: req.body.contents
  })

  // 3. DB에 저장된 결과를 브라우저에 응답(response) 주기
  const resut = await board.save()

  res.send('게시물 등록에 성공하였습니다.')
})

// app.post("/token/phone", (req, res) => {

//   const { phoneNumber } = req.body
//   //1, 휴대폰번호 자릿수 맞는지 확인하기(10~11자리)
//   const isValid = checkPhone(phoneNumber)
//   if (!isValid) return res.send("error")

//   //2. 핸드폰 토큰 6자리 만들기
//   const token = getToken()

//   //3. 핸드폰 번호에 토큰 전송하기
//   sendTokenToSMS(phoneNumber, token)
//   res.send(`토큰 발송: ${token}`)
// })

app.post("/users", (req, res) => {
  // const name = req.body.name
  // const age = req.body.age
  // const school = req.body.school
  // const email = req.body.email
  const { name, age, school, email } = req.body
  //1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkEmail(email)
  if (!isValid) return
  //2. 가입환영 템플릿 만들기
  const template = getWelcomeTemplate({ name, age, school })
  //3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, template)
  res.send("가입완료")
})

mongoose.connect('mongodb://my-database:27017/mydocker')
  .then(() => console.log("db 접속에 성공하셨습니다"))
  .catch(() => console.log("db 접속에 실패하였습니다"))

app.listen(4000)

