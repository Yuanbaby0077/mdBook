// const obj = {
//   name: 'zs',
//   foo: function() {
//     console.log(this.name, arguments)
//     return this.name
//   }
// }

// obj.foo(1) // zs
// const bar = obj.foo // bar指向obj.foo方法的引用，此时this指向window
// bar(2) // undefined

// 使用call来改变this指向

// 参数，第一个是this的指向，后面的参数都是arguments
// 立即执行
// 临时改变
// 第一个参数传null或undefined this指向window

// bar.call(obj, 3,4)// zs [Arguments] { '0': 3, '1': 4 }
// bar(3, 5) // undefined [Arguments] { '0': 3, '1': 5 }
// bar.call(2, 3,4) // undefined [Arguments] { '0': 3, '1': 4 }

// 使用apply来改变

// 参数，第一个是this的指向，第二个是参数列表
// 立即执行
// 临时改变
// bar.apply(obj, [4,5,6]) // zs [Arguments] { '0': 4, '1': 5, '2': 6 }

// bar(4,5,6) // undefined [Arguments] { '0': 4, '1': 5, '2': 6 }


// 使用bind来改变this的指向
// 不立即执行 返回一个永久改变this指向的函数
// 参数可以分多次传递
// const zoo = bar.bind(obj, 1,2)
// zoo(4,5,7) // zs [Arguments] { '0': 1, '1': 2, '2': 4, '3': 5, '4': 7 }

/** ===============实现 call apply bind=============== */

function handleCheck(type) {
  return (obj) => {
    return Object.prototype.toString.call(obj).slice(8, -1) === type
  }
}
const isString = handleCheck('String')
const isObject = handleCheck('Object')
const isArray = handleCheck('Array')
const a = '123'
const b = {}
const c = []
console.log(isString(a))
console.log(isObject(b))
console.log(isArray(c))

// 1、改变this指向
/**
 * 
 * @param {*} ctx 
 * @param  {...any} args 
 * @returns 
 */
Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx instanceof Object ? ctx :  global
	ctx.fn = this
  const result = ctx.fn(...args)
  delete ctx.fn
  return result
}

function show() {
  console.log(this.name, arguments)
}
const obj2 = {
  name: 'zs'
}
show.myCall(obj2, 3,45)

/**
 * 
 * @param {*} ctx 
 * @param {*} args 
 * @returns 
 */
Function.prototype.myApply = function (ctx, args = []) {
  if (!isArray(args)) {
    throw TypeError('CreateListFromArrayLike called on non-object')
  }
  ctx = ctx instanceof Object ? ctx :  global
	ctx.fn = this
  const result = ctx.fn(...args)
  delete ctx.fn
  return result
}

// show.myApply(obj2, [1,2,3])
// show.apply(obj2, [1,2,3], 4,5)
// show.myApply(obj2, [1,2,3], 4,5)
// show.myApply(obj2, 1,2,3) // typeError

// 1、使用apply改变this指向
// 2、分次传参数 合并参数
// 3、支持new关键字
Function.prototype.myBind = function(context) {
  const fn = this
  const args = [].slice.call(arguments, 1)
  const newFn = function() {
    const reArgs = [].slice.call(arguments)
    if (this instanceof newFn) {
      fn.apply(this, args.concat(reArgs))
    } else {
      fn.apply(context, args.concat(reArgs))
    }
  }
  newFn.prototype = fn.prototype
  return newFn
}
// show.myBind(obj2, 1,2)(3,4)
// show.myBind(obj2, 1,2,3,4)()
show.myBind(obj2)(1,2, 3,4)
show.prototype.getName = 'ls'

const oBind = show.myBind(obj2)
const newBind = new oBind()
console.log(newBind.getName)

// 函数.bind使用new操作符之后，this指向不变, 并让返回的函数原型指向构造函数的原型
// let obj4 = {
//   name:'我'
// }
// function fn(country, type){
//   console.log(this.name)
// }
// fn.prototype.city = '北京'
// let newFn = fn.bind(obj4)
// let oBind = new newFn()
// console.log(oBind.name) // undefined
// console.log(oBind.city) // 北京
