// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex'
  const input01 = document.getElementById("PhoneNumber01").value
  const input02 = document.getElementById("PhoneNumber02").value
  const input03 = document.getElementById("PhoneNumber03").value
  console.log('인증 번호 전송')
  axios.post("http://localhost:3000/token/phone", {
    phoneNumber: input01 + input02 + input03
  })
}

// 회원 가입 API 요청
const submitSignup = async () => {
  console.log('회원 가입 이메일 전송')
  const name = document.getElementById("SignupName").value
  const personal = document.getElementById("SignupPersonal").value
  const phoneNum01 = document.getElementById("PhoneNumber01").value
  const phoneNum02 = document.getElementById("PhoneNumber02").value
  const phoneNum03 = document.getElementById("PhoneNumber03").value
  const site = document.getElementById("SignupPrefer").value
  const email = document.getElementById("SignupEmail").value
  const password = document.getElementById("SignupPwd").value
  axios.post("http://localhost:3000/signup", {
    name,
    personal,
    phoneNum: phoneNum01 + phoneNum02 + phoneNum03,
    email,
    site,
    password
  })
}
