function solution(s) {
  s = s.split(" ")
  const max = Math.max(...s)
  const min = Math.min(...s)

  return min + " " + max
}
