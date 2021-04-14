// Function.prototype.myCall = function(ctx, ...args) {
//   ctx = ctx instanceof Object ?  ctx : global
//   ctx.fn = this
//   const result = ctx.fn(...args)
//   delete ctx.fn
//   return result
// }

// Function.prototype.myApply = function(ctx, args = []) {
//   if (!Array.isArray(args)) 
//     throw TypeError('typeError')
//   ctx = ctx instanceof Object ?  ctx : global
//   ctx.fn = this
//   const result = ctx.fn(...args)
//   delete ctx.fn
//   return result
// }

// 改变this指向
// 合并参数
// new 操作符
Function.prototype.myBind = function(ctx) {
  console.log(this, ctx)
  const fn = this
  const args = [].slice.call(arguments, 1)
  const newFn = function() {
    const otherArgs = [].slice.call(arguments)
    if (this instanceof newFn) {
      fn.apply(this, args.concat(otherArgs))
    } else {
      fn.apply(ctx, args.concat(otherArgs))
    }
  }
  newFn.prototype = fn.prototype
  return newFn
}

const obj = {
  name: 'ww'
}

function getName() {
  console.log(arguments, this.name)
  return this.name
}

getName.prototype.getInfo = 'info'

// getName.myBind(obj, [1,2,3])(1,2,3)
// getName.myBind(obj, [1,2,3], 1,2,3)()

const oBind = getName.myBind(obj)
const newBind = new oBind(1,2,3)
console.log('=========')
console.log(newBind.getInfo)



