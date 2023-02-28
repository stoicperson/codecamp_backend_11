const { Worker } = require("worker_threads");

const start = () => {

  let totalSum = 0;

  for (let i = 0; i < 9; i++) {
    const worker = new Worker("./worker.js")
    worker.postMessage(100000000)
    worker.on("message", (result) => {
      totalSum += result
      console.log(`나는 ${i}번째 일군이고, 현재까지 총 합은 ${totalSum}이야`)
    })
  }

  console.log(totalSum)

  return totalSum
}

start()