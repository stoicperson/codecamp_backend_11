const solution = (phone_number) => phone_number.slice(-4).padStart(phone_number.length, "*")

function solution2(phone_number) {
  let answer = '';

  for (let i = 0; i < phone_number.length; i++) {
    if (i < phone_number.length - 4) {
      //뒷 4자리를 제외한 앞의 번호들은 *로 처리
      // answer = answer + "*"
      answer += "*"
    } else {
      answer += phone_number[i]
    }
  }

  return answer
}

function solution3(phone_number) {
  let answer = '';

  answer = answer.padStart(phone_number.length - 4, "*")

  answer += phone_number.slice(phone_number.length - 4)

  return answer
}
