// 斐波那伽数列

function fn(n) {
  if (n === 1 || n === 2) return 1
  return fn(n - 1) + fn(n - 2)
}

// 1 1 2 3 5 8
console.log(fn(6)) // 8

var arr = [1,2,4,1,7,8,3]

// 递归 时间复杂度 O(2的n次方)
function rec_opt(arr, n) {
  if (n === 0) return arr[0]
  if (n === 1) return Math.max(arr[0], arr[1])
  const a = arr[n] + rec_opt(arr, n - 2)
  const b = rec_opt(arr, n - 1)
  return Math.max(a, b)
}
console.log(rec_opt(arr, 6)) // 15

// 非递归

function dp_opt(arr) {
  var opt = []
  opt[0] = arr[0]
  opt[1] = Math.max(arr[0], arr[1])
  for (let i = 2; i < arr.length; i ++) {
    opt[i] = Math.max(arr[i] + opt[i - 2], opt[i - 1])
  }
  return opt[arr.length - 1]
}

console.log(dp_opt([4,1,1,9,1]))
