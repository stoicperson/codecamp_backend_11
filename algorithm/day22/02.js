function solution(nums) {
  const isPrime = (num) => {
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) return false
    }
    return true
  }
  let answer = 0
  const length = nums.length
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      for (let k = j + 1; k < length; k++) {
        if (isPrime(nums[i] + nums[j] + nums[k])) answer++
      }
    }
  }
  return answer;
}

function solution1(nums) {
  let answer = 0;

  for (let i = 0; i < nums.length; i++) {
    for (let l = i + 1; l < nums.length; l++) {
      for (let j = l + 1; j < nums.length; j++) {
        const sum = nums[i] + nums[l] + nums[j];

        let count = 0;
        for (let o = 1; o <= sum; o++) {
          if (sum % o === 0) {
            // 약수를 구해온다.
            count++;

            if (count > 2) {
              break;
            }
          }
        }
        if (count === 2) {
          answer++;
        }
      }
    }
  }
  return answer;
}

function solution2(nums) {
  let answer = 0;

  for (let i = 0; i < nums.length; i++) {
    for (let l = i + 1; l < nums.length; l++) {
      for (let j = l + 1; j < nums.length; j++) {
        const sum = nums[i] + nums[l] + nums[j];

        let count = 0;
        for (let o = 1; o <= sum; o++) {
          if (sum % o === 0) {
            // 약수를 구해온다.
            count++;

            if (count > 2) {
              break;
            }
          }
        }
        if (count === 2) {
          answer++;
        }
      }
    }
  }
  return answer;
}