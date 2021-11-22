function add(a, b) {
  console.log('this', this)
  return a + b
}

const obj = {
  name: 'zs'
}

// console.log(add.call(obj, 1,2))

Function.prototype._call = function(ctx) {
  ctx.fn = this
  const args = [...arguments].slice(1)
  const res = ctx.fn(...args)
  delete ctx.fn
  return res
}

Function.prototype._apply = function(ctx, args) {
  if (!Array.isArray(args)) throw new Error('TypeError: CreateListFromArrayLike called on non-object')
  ctx.fn = this
  const res = ctx.fn(...args)
  delete ctx.fn // 不能增加ctx的属性，需要删除
  return res
}

// console.log(add._apply(obj, [2,3]))


Function.prototype._bind = function(ctx) {
  const args = [...arguments].slice(1)
  const that = this
  const fn = function() {
    const resArgs = args.concat([...arguments])
    if (this instanceof fn) {
      return that.apply(this, resArgs)
    }
    return that.apply(ctx, resArgs)
  }
  fn.prototype = this.prototype
  return fn
}
// console.log(add._bind(obj, 2)(4))

var bind = add.bind(obj, 3)
var tar = new bind(4,4)
console.log(tar)

