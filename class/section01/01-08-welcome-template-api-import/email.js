import { getToday } from "./utils"

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
function getWelcomeTemplate({ name, age, school, createdAt }) {
  const template = `
  <html>
    <body>
      <h1>${name}님 가입을 환영합니다!!!</h1>
      <hr />
      <div>이름: ${name}</div>
      <div>나이: ${age}</div>
      <div>학교: ${school}</div>
      <div>가입일: ${getToday()}< /div>
    </body>
  </html>
  `
  return template
}
function sendTemplateToEmail(email, template) {
  console.log(email + "이메일로 가입환영템플릿" + template + "를 전송하였습니다")
}

export { checkEmail, getWelcomeTemplate, sendTemplateToEmail }