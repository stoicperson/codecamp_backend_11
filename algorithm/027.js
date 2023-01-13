function bigNum(str) {
  let biggest = 0;
  for (let i of str) {
    if (biggest < i) biggest = +i
  }
  return biggest
}
// function bigNum(str) {
//   let biggest = str[0]
//   for(let i = 1; i < str.length; i++) {
//     if(biggest < Number(str[i])) {
//       biggest = Number(str[i])
//     }
//   }
// }
function bigNumWithMath() {
  return Math.max(...str.split(''))
}

Math.max(1, 2, 3, 3, 4, 4, 5);

bigNum("87135")