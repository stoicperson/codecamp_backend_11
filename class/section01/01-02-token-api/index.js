// 인좋은 예
// function createTokenOfPhone(phoneNumber) { //매개변수(parameter)
//   //1, 휴대폰번호 자릿수 맞는지 확인하기(10~11자리)
//   if (phoneNumber.length >= 10) {
//     if (phoneNumber.length <= 11) {
//       //2. 핸드폰 토큰 6자리 만들기
//       const token = String(Math.floor(Math.random() * 1000000)).padStart(6, '0')
//       console.log(token)
//       //3. 핸드폰 번호에 토큰 전송하기
//       console.log(phoneNumber + "번호로" + token + "를 전송합니다.")
//     } else {
//       console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해주세요!!")
//     }
//   } else {
//     console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해주세요!!")
//   }
// }

// 좋은 예
function createTokenOfPhone(phoneNumber) { //매개변수(parameter)
  //1, 휴대폰번호 자릿수 맞는지 확인하기(10~11자리)
  if (phoneNumber.length < 10 || phoneNumber.length > 11) { //early-exit 패턴 or early-return 패턴
    console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해주세요!!")
    return
  }
  //2. 핸드폰 토큰 6자리 만들기
  const token = String(Math.floor(Math.random() * 1000000)).padStart(6, '0')
  console.log(token)
  //3. 핸드폰 번호에 토큰 전송하기
  console.log(phoneNumber + "번호로" + token + "를 전송합니다.")
}

createTokenOfPhone("01012345678") //인자(argument)