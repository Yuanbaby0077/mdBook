
name = 'ls'
age = 55
Function.prototype._call = function(ctx) {
  // 改变this指向
  ctx.fn = this
  // 获取参数
  const args = [...arguments].slice(1)
  // 立即调用
  const res = ctx.fn(...args)
  // 不能增加ctx的属性，需要删除
  delete ctx.fn
  return res
}

const user = {
  name: 'zs',
  age: 23
}
function getScore(score, rank) {
  this.score = score
  this.rank = rank
  if (this instanceof getScore) {
    console.log('this instanceof getScore')
  }
  console.log(this, this.name, this.age)
  return `${this.name} is ${this.age}, and his math score is ${this.score}, rank is ${this.rank}`
}

getScore.prototype.getName = function() {
  console.log(this.getName)
}


// console.log(getScore._call(user, 100, 'A'))


Function.prototype._apply = function(ctx, args) {
  if (args && !Array.isArray(args)) {
    throw new Error('apply参数应该为数组')
  }
  // 改变this指向
  ctx.fn = this
  // 立即调用
  
  const res = args === undefined ? ctx.fn() : ctx.fn(...args)
  // 不能增加ctx的属性，需要删除
  delete ctx.fn
  return res
}

// console.log(getScore._apply(user))
// console.log(getScore._apply(user, [100, 'A']))

/**
 * 1、改变this指向
 * 2、返回新的函数, 新函数的返回值就是bind的调用结果，这里可以使用call或者apply
 * 3、判断是否通过new操作符: 那么不改变this的指向 等价于 new getScore(30, 'F')
 */
Function.prototype._bind = function(ctx) {
  const beforeArgs = [...arguments].slice(1)
  const self = this
  const fn = function() {
    const fullArgs = beforeArgs.concat([...arguments])
    // this是fn的实例，说明是new出来的
    if (this instanceof fn) {
      return new self(...fullArgs) // 这里有什么问题吗？？
    }
    return self.apply(ctx, [...fullArgs])
  }
  return fn
}

Function.prototype._bind2 = function(ctx) {
  console.log(this)
  const beforeArgs = [...arguments].slice(1)
  const self = this
  // 创建一个空对象
  const fn = function() {
    const fullArgs = beforeArgs.concat([...arguments])
    // this是fn的实例，说明是new出来的,否则 this指向window
    return self.apply(this instanceof fn ? this : ctx, [...fullArgs])
  }
  // fn函数的原型指向绑定的函数的原型
  fn.prototype = this.prototype
  return fn
}

// call/apply 使用场景和原理 https://github.com/yygmind/blog/issues/22
// bind 使用场景和原理 https://github.com/yygmind/blog/issues/23
console.log('------------------bind-------------')
const userBind = getScore._bind2(user, 100)
// const score = userBind('A')
// console.log(score)
const newUserBind = new userBind('A')
console.log(newUserBind.__proto__)
