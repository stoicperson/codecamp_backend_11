function solution(new_id) {
  new_id = new_id.toLowerCase().replace(/[^a-z0-9\.\-\_]/g, "")
  new_id = new_id.replace(/\.{1,}/g, ".")
  new_id = new_id.replace(/(^\.) | (\.$)/, "")
  if (!new_id) {
    new_id = 'a'
  }
  if (new_id.length > 15) {
    new_id = new_id.slice(0, 15).replace(/\.$/, "")
  } else if (new_id.length < 3) {
    new_id.padEnd(3, new_id.at(-1))
  }
  return new_id
}