
function solution1(nums) {
  const answer = []

  for (let i = 0; i < nums.length; i++) {
    if (
      (nums.length / 2) !== answer.length &&
      answer.includes(nums[i]) === false
    ) {
      answer.push(nums[i])
    }
  }
  return answer.length
}