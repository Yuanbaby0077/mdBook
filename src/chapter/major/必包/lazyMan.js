/**
 * 实现一个LazyMan，可以按照以下方式调用:
LazyMan('Hank')输出:
Hi! This is Hank!
LazyMan('Hank').sleep(10).eat('dinner')输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~
LazyMan('Hank').sleep(10).eat('dinner').eat('supper')输出
Hi This is Hank!
Eat dinner~
Eat supper~
LazyMan('Hank').sleepFirst(5).eat('supper')输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper~
以此类推。
 */

/**
 * LazyMan('Hank')输出:
  Hi! This is Hank!
 */

class _LazyMan {
  name = null
  cbs = []
  constructor(name) {
    const cb = (next)=>{
      console.log(`Hi This is ${name}!`)
      next()
    }
    this.cbs.push(cb)
    setTimeout(() => {
      this.next()
    }, 0)
  }
}

function LazyMan(name) {
  return new _LazyMan(name)
}

_LazyMan.prototype.sleep = function(delay) {
  const cb = (next) => {
    setTimeout(() => {
      console.log('sleep')
      next()
    }, delay)
  }
  this.cbs.push(cb)
  return this
}

_LazyMan.prototype.eat = function(food) {
  const cb = (next) => {
    console.log('eat ' + food)
    next()
  }
  this.cbs.push(cb)
  return this
}

_LazyMan.prototype.sleepFirst = function(delay) {
  const cb = (next) => {
    setTimeout(() => {
      console.log('sleep first')
      next()
    }, delay)
  }
  this.cbs.unshift(cb)
  return this
}

_LazyMan.prototype.next = function() {
  if (this.cbs.length) {
    const fn = this.cbs.shift()
    fn && fn(this.next.bind(this))
  }
}

LazyMan('zs').sleep(100).sleepFirst(1000)