import { getToday } from "./utils.js"
import nodemailer from "nodemailer"

function checkEmail(email) {
  if (!email) {
    console.log("이메일이 존재하지 않습니다.")
    return false
  }
  if (!email.includes("@")) {
    console.log("이메일의 형식이 옮바르지 않습니다.")
    return false
  }
  return true
}
function getWelcomeTemplate({ name, phoneNum, site }) {   // 메일은 아직까지 구버전 html, css 사용하는 플랫폼이 있기 때문에 최신문법을 사용하지 않아야한다
  const template = `
  <html>
    <body>
      <div style="display: flex; flex-direction: column; align-items: center;">
        <div style="width: 500px">
          <h1>${name}님 가입을 환영합니다!!!</h1>
          <hr />
          <div>이름: ${name}</div>
          <div style="color: purple;">전화번호: ${phoneNum}</div>
          <div style="color: purple;">좋아하는 사이트: <a href=${site}>${site}</a></div>
          <div style="color: red;">가입일: ${getToday()}< /div>
        </div>
      </div>
    </body>
  </html>
  `
  return template
}
async function sendTemplateToEmail(email, template) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "quodacedia@gmail.com",
      pass: process.env.MAIL_SECRET_KEY,
    },
  });
  let res = await transporter.sendMail({
    from: 'qodaceida',
    to: email,
    subject: "가입을 축하합니다!!",
    html: template
  });
  console.log(email + "이메일로 가입환영템플릿" + template + "를 전송하였습니다")
}

export { checkEmail, getWelcomeTemplate, sendTemplateToEmail }