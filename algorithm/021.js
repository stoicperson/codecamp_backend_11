function days(month) {
  const time = new Date()
  time.setMonth(month, 0)
  return time.getDate()
}