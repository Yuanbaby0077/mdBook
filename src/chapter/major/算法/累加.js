// 1 + 2 + 3 + ... + n

let a = 1
function calc(res) {
  let sum = res
  if (!res) {
    sum = 0
  }
  if (a > 100) return res
  sum = (res || 0) + a
  a++
  console.log(a, sum)
  return calc(sum)
}

console.log(calc())



