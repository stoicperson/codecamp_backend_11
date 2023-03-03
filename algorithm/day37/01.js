function solution(record) {
  const typeArr = []
  const map = new Map()

  for (let el of record) {
    const [type, uid, name] = el.split(" ")
    if (type === "Change") {
      map.set(uid, name)
    } else if (type === 'Enter') {
      map.set(uid, name)
      typeArr.push([uid, "님이 들어왔습니다."])
    } else {
      typeArr.push([uid, "님이 나갔습니다."])
    }
  }

  return typeArr.map((item) => map.get(item[0]) + item[1])
}