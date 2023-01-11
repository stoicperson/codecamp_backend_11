function makeDate() {
  const now = new Date()
  console.log(`오늘은 ${now.getFullYear()}년 ${String(now.getMonth() + 1).padStart(2, '0')}월 ${String(now.getDate()).padStart(2, '0')}일 ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`)
}

makeDate()