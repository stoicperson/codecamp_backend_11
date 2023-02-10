function solution(N, stages) {
  const arr = new Array(N + 1).fill(0)
  for (let i of stages) {
    arr[i - 1]++
  }
  const a = arr.map((el, i) => [el / arr.slice(i).reduce((cur, acc) => cur + acc), i + 1])
  a.pop()
  return a.sort((a, b) => b[0] - a[0]).map(el => el[1])
}

function solution1(N, stages) {
  stages.sort((a, b) => a - b)
  const failArr = []
  for (let i = 1; i <= N; i++) {
    failArr.push({
      stage: i,
      users: 0,
      fail: 0
    })
  }
  let allUsers = stages.length;
  for (let i = 0; i < stages.length; i++) {
    if (failArr[stages[i] - 1] !== undefined) {
      failArr[stages[i] - 1].user++

      if (stages[i] !== stages[i + 1]) {
        const fail = failArr[stages[i] - 1].users / allUsers
        allUsers -= failArr[stages].users

        failArr[stages[i] - 1].fail = fail
      }
    }
  }
  const answer = failArr.sort((a, b) => b.fail - a.fail)
  return answer.map(el => el.stage)
}

function soltion2(N, stages) {
  stages.sort((a, b) => a - b);

  let allUsers = stages.length; // 총 유저의 수
  const answer = new Array(N)
    .fill(1)
    .map((num, i) => {
      const stage = num + i;
      const arr = stages.slice(
        stages.indexOf(stage),
        stages.lastIndexOf(stage) + 1
      )
      const fail = arr.length / allUsers;
      allUsers -= arr.length;

      return { stage, fail }
    })

  answer.sort((a, b) => b.fail - a.fail)

  return answer.map((el) => el.stage)
}