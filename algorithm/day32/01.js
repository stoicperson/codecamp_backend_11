function solution(skill, skill_trees) {
  const regex = new RegExp(`[^${skill}]`, "g")
  const regexTwo = new RegExp(`^${skill[0]}`)
  return skill_trees.map((el) => el.replace(regex, "")).filter(el => !skill.indexOf(el) || !el).length
}