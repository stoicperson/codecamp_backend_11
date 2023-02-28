function solution(id_list, report, k) {

  report = [...new Set(report)].map((el) => el.split(" "))

  const counts = new Map()
  for (let i of report) {
    counts.set(i[1], (counts.get(i[1]) + 1 || 1))
  }

  const mail = new Map()
  for (let i of report) {
    if (counts.get(i[1]) >= k) {
      mail.set(i[0], mail.get(i[0]) + 1 || 1)
    }
  }
  return id_list.map(el => mail.get(el) || 0)
}
