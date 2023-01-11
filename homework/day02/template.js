function getWelcomeTemplate({ name, email, socialNumber, phoneNumber, site }) {
  const mytemplate = `
  <html>
    <body>
      <h1>${name}님 가입을 환영합니다!!!</h1>
      <hr />
      <div>이메일: ${email}</div>
      <div>주민번호: ${makeSocialNumber(socialNumber)}</div>
      <div>휴대폰 번호: ${phoneNumber}</div>
      <div>내가 좋아하는 사이트: ${site}< /div>
    </body>
  </html>
  `
  console.log(mytemplate)
}
function makeSocialNumber(number) {
  return number.substring(0, 8) + "******"
}

getWelcomeTemplate({ name: "박민", email: "aaa@aaa.com", socialNumber: "444444-4444444", phoneNumber: "000-0000-0000", site: "codebootcamp.co.kr" })