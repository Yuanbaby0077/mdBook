
// 使用call来改变this指向

// 参数，第一个是this的指向，后面的参数都是arguments
// 立即执行
// 临时改变
// 第一个参数传null或undefined this指向window
Function.prototype.myCall = function(ctx, ...args) {
  ctx = ctx instanceof Object ?  ctx : global
  ctx.fn = this
  const result = ctx.fn(...args)
  delete ctx.fn
  return result
}

// function add(a, b) {
//   return a + b
// }

// const tar = {}

// const res = add.myCall(tar, 1, 3)
// console.log(res)

// 使用apply来改变

// 参数，第一个是this的指向，第二个是参数列表
// 立即执行
// 临时改变
Function.prototype.myApply = function(ctx, args = []) {
  if (!Array.isArray(args)) 
    throw TypeError('typeError')
  ctx = ctx instanceof Object ?  ctx : global
  ctx.fn = this
  const result = ctx.fn(...args)
  delete ctx.fn
  return result
}

// 改变this指向，不是立即执行的，因此，this指向是不会变
// 合并参数
// new 操作符，那么 this会指向new 出来的实例，而不是传入的ctx
Function.prototype.myBind = function(ctx) {
  const fn = this
  const args = Array.prototype.slice.call(arguments, 1)
  const newFn = function() {
    const args2 = Array.prototype.slice.call(arguments)
    const mergeArgs = args.concat(args2)
    // 如果使用new 操作符来创建myBind返回的函数的实例，
    // 那么this将会是newFn的实例
    if (this instanceof newFn) {
      return fn.apply(this, mergeArgs)
    } else {
      return fn.apply(ctx, mergeArgs)
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

// const bind1 = getName.myBind(obj, 1, 3, 2)(4, 5)
// console.log(bind1)

const bind2 = getName.myBind(obj)

console.log(bind2(5,6))

const newBind2 = new bind2(1,2,3)

console.log(newBind2)

