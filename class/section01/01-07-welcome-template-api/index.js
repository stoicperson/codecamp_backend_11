
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
      <div>가입일: ${createdAt}< /div>
    </body>
  </html>
  `
  return template
}
function sendTemplateToEmail(email, template) {
  console.log(email + "이메일로 가입환영템플릿" + template + "를 전송하였습니다")
}
function createUser({ name, age, school, email, createdAt }) {
  //1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkEmail(email)
  if (!isValid) return
  //2. 가입환영 템플릿 만들기
  const template = getWelcomeTemplate({ name, age, school, createdAt })
  //3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, template)
}

const name = "철수"
const age = 8
const school = "다람쥐초등학교"
const email = "a@a.com"
const createdAt = Date.now()

createUser({ name, age, school, email, createdAt })