function solution(people, limit) {
  let length = people.length
  people.sort((a, b) => a - b)
  for (var i = 0, j = length - 1; i < j; j--) {
    if (people[i] + people[j] <= limit) i++
  }
  return length - i;
}