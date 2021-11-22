Array.prototype._forEach = function(fn) {
  const arr = this
  console.log(arr)
  for (let i = 0; i < arr.length; i++) {
    fn.call(null, arr[i], i, arr)
  }
}

[1,2,3]._forEach(function() {
  console.log(...arguments)
})

Array.prototype._map = function(fn) {
  const arr = this
  const res = []
  for (let i = 0; i < arr.length; i++) {
    res[i] = fn.call(null, arr[i], i, arr)
  }
  return res
} 

[1,2,3].map(function(i, index, arr) {
  return i * index
})

Array.prototype._filter = function(fn) {
  const arr = this
  const res = []
  for (let i = 0; i < arr.length; i++) {
    const valid = fn.call(null, arr[i], i, arr)
    if (valid) res.push(arr[i])
  }
  return res
}

[1,2,3]._filter((i) => i > 2)

Array.prototype._every = function(fn) {
  const arr = this
  let res = true
  for (let i = 0; i < arr.length; i++) {
    const valid = fn.call(null, arr[i], i, arr)
    if (!valid) return false
  }
  return res
}

Array.prototype._some = function(fn) {
  const arr = this
  let res = false
  for (let i = 0; i < arr.length; i++) {
    const valid = fn.call(null, arr[i], i, arr)
    if (valid) return true
  }
  return res
}

Array.prototype._reduce = function(fn, prev) {
  const arr = this
  // 如果有初始值prev, 则从0开始遍历，否则prev为arr[0],从1开始遍历
  let begin = prev ? 0 : 1
  let res = prev ? prev : arr[0]
  for (let i = begin; i < arr.length; i++) {
    res = fn.call(null, res, arr[i], i, arr)
  }
  return res
}

[1,2,3,4]._reduce((prev, cur, curIndex, arr) => {
  return prev + cur
})

Array.prototype._findIndex = function(fn, args) {
  const arr = this
  for (let i = 0; i < arr.length; i++) {
    const flag = fn.call(null, arr[i], i, arr)
    if (flag) return i
  }
  return -1
}

Array.prototype._find = function(fn, args) {
  const arr = this
  for (let i = 0; i < arr.length; i++) {
    const flag = fn.call(null, arr[i], i, arr)
    if (flag) return arr[i]
  }
  return undefined
}

Function.prototype._call = function(ctx) {
  ctx.fn = this
  const args = [...arguments].slice(1)
  const val = ctx.fn(...args)
  delete ctx.fn
  return val
}

Function.prototype._call = function(ctx) {
  const fn = Symbol()
  ctx[fn] = this
  const args = [...arguments].slice(1)
  const val = ctx[fn](...args)
  delete ctx[fn]
  return val
}
function sum(a, b) {
  console.log(this)
  return a + b
}

var a = {
  getName() {
    console.log(this)
  }
}
sum._call(a, 1,2)


function timer() {
  const t = setTimeout(() => {
    console.log('执行。。。')
  }, 1000)
  if (t) {
    return t
  }
  return undefined
}


