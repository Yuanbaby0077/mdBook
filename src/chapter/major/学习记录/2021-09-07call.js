Function.prototype._call = function(obj) {
  const ctx = this
  const args = [...arguments].slice(1)
  obj.fn = ctx
  const res = obj.fn(...args)
  delete obj.fn
  return res
}

Function.prototype._apply = function(ctx, arr) {
  if (!Array.isArray(arr)) throw TypeError('传入的参数类型应该是数组')
  ctx.fn = this
  const res = ctx.fn(...arr)
  delete ctx.fn
  return res
}

function add(a, b) {
  console.log(this)
  return a + b
}

var obj = {
  name: 'zs'
}

var res = add._call(obj, 3,4)
console.log(res)

var res2 = add._apply(obj, [5,6,7])
console.log(res2)