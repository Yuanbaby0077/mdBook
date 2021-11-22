

// 实现map

var a = [1,2,3,4,5]
function fn(i) {
  return i * 2
}
function _map(arr, fn) {
  const res = []
  for(let i = 0; i<arr.length; i++) {
    if (i in arr) {
      res[i] = fn.call(null, arr[i], i, arr)
    }
  }
  return res
}
console.log(_map(a, fn))

// console.log(a.reduce((acc, cur, i, arr) => acc + cur))
var res = a.reduce((acc, cur, i, arr) => {
  console.log('i=', i)
  return acc + cur
})
console.log(res)
function reduceFn(acc, cur, i, arr) {
  return acc + cur * 2
}
function _reduce(arr, fn, initValue) {
  let res = 0
  const len = arr.length
  if (len === 0) return res
  let i = 0
  if (initValue) {
    res = initValue
  } else {
    i++
    res = arr[0]
  }
  for (i; i < arr.length; i++) {
    const value = arr[i]
    res = fn.call(null, res, value, i, arr)
  }
  return res
}
console.log('====', _reduce(a, reduceFn, 3))