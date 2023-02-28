function solution(progresses, speeds) {
  return progresses.map(function (el, idx) {
    const progress = Math.ceil((100 - el) / speeds[idx])
    if (progress > this.day) {
      this.day = progress
    }
    return this.day
  }, { day: 0 }).reduce((acc, cur, i, array) => {
    if (cur !== array[i - 1]) {
      acc[acc.length] = 1;
    } else {
      acc[acc.length - 1]++;
    }
    return acc
  }, [])
}