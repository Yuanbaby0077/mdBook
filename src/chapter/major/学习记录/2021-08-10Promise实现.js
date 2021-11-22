const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
  constructor(excutor) {
    this.state = PENDING
    this.value = null
    this.onFulfilledList = []
    this.onRejectedList = []
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
    try {
      excutor(this.resolve, this.reject)
    }catch(e) {
      this.reject(e)
    }
  }

  static resolve(x) {
    if (x instanceof MyPromise) return x
    return new MyPromise((resolve, reject) => {
      resolve(x)
    })
  }

  static reject(x) {
    return new MyPromise((resolve, reject) => {
      reject(x)
    })
  }

  /**
   * 1、接收一个数组作为参数或者可迭代对象
   * 2、返回一个promise
   * 3、如果元素是promise，则全部成功为成功，若有一个失败则失败
   * 4、若元素不是Promise，原样返回
   * 4、若成功，返回值为各个promise执行then后的值的集合
   * @param {*} promises 
   * @returns 
   */
  static all(promises) {
    return new Promise((resolve, reject) => {
      const result = []
      let cnt = 0
      for (let i = 0; i < promises.length; i++) {
        const p = promises[i]
        if (p instanceof MyPromise) {
          p.then((res) => {
            result[i] = res
            cnt++
            console.log(promises.length, cnt)
            if (cnt === promises.length) resolve(result)
          }, (reason) => reject(reason))
        } else {
          cnt++
          result[i] = p
        }
      }
    })
  }
  /**
   * 每一个执行结果都会返回，不论成功过失败
   * 成功返回的结果： {status: "fulfilled", value: ''}
   * 失败返回的结果：{ status: "rejected", reason: '' }
   * @param {*} x 
   * @returns 
   */
  static allSettled(promises) {
    return new Promise((resolve, reject) => {
      const result = []
      let cnt = 0
      const calcRes = function(status, key, value, i) {
        result[i] = {
          status,
          [key]: value
        }
        cnt++
        if (cnt === promises.length) resolve(result)
      }
      for (let i = 0; i < promises.length; i++) {
        const p = promises[i]
        if (p instanceof MyPromise) {
          p.then((res) => {
            calcRes('fulfilled', 'value', res, i)
          }, (reason) => {
            calcRes('rejected', 'reason', reason, i)
          })
        } else {
          calcRes('fulfilled', 'value', p, i)
        }
      }
    })
  }
  /**
   * 传入一组promise实例作为参数
   * 是要有一个实例成功即成功，返回执行成功的Promise结果
   * 全部失败才失败,
   * 传入的非Promise直接成功,使用MyPromise.resolve()转为promise对象
   * @param {*} promises 
   */
  static any(promises) {
    return new MyPromise((resolve, reject) => {
      let cnt = 0
      for (let i = 0; i < promises.length; i++) {
        const v = promises[i]
        const p = v instanceof MyPromise ? v : MyPromise.resolve(v)
        p.then((res) => {
          resolve(res)
        }, reason => {
          cnt++
          if (cnt === promises.length) reject('all rejected')
        })
      }
    })
  }
  /**
   * 将多个 Promise 实例，包装成一个新的 Promise 实例
   * 有一个实例率先改变状态，结果的状态就跟着改变，率先改变的Promise实例的返回值，
   * 就传递给promise的回调
   * @param {*} promises 
   */
  static race(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach(p => {
        p = p instanceof MyPromise ? p : MyPromise.resolve(p)
        p.then((res) => {
          console.log('=======', res)
          resolve(res)
        }, (reason) => {
          reject(reason)
        })
      })
    })
  }
}


MyPromise.prototype.resolve = function(value) {
  if (this.state !== PENDING) return
  this.state = FULFILLED
  this.value = value
  while(this.onFulfilledList.length) {
    this.onFulfilledList.shift()(this.value)
  }
}

MyPromise.prototype.reject = function(reason) {
  if (this.state !== PENDING) return
  this.state = REJECTED
  this.value = reason
  while(this.onRejectedList.length) {
    this.onRejectedList.shift()(this.value)
  }
}

/**
 * 1、then方法接受个参数，fulfilled函数和rejected函数
 * 2、支持链式调用 返回的是promise
 * 3、如果resolve在setTimeout的回调中执行，那么then方法会在setTimeout回调后执行。
 * @param {*} fulfilled 
 * @param {*} rejected 
 */
MyPromise.prototype._then = function(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' 
    ? onFulfilled.bind(this)
    : val => val
  onRejected = typeof onRejected === 'function'
    ? onRejected.bind(this)
    : reason => { throw Error(reason) }
  if (this.state === FULFILLED) {
    onFulfilled(this.value)
  } else if (this.state === REJECTED) {
    onRejected(this.value)
  } else {
    this.onFulfilledList.push(onFulfilled)
    this.onRejectedList.push(onRejected)
  }
  return this
}

/**
 * 1、then方法本身会返回一个Promise对象
 * 2、如果返回值是Promise对象，返回值成功，新Promise就成功
 * 3、如果返回值是Promise对象，返回值失败，新Promise就失败
 * 4、如果返回值非Promise对象，新Promise对象就是成功，值为返回值
 * 5、不能return自身
 * 6、then是微任务
 * @param {*} onFulfilled 
 * @param {*} onRejected 
 * @returns 
 */
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function'
    ? onFulfilled
    : () => undefined
  
  onRejected = typeof onRejected === 'function' 
    ? onRejected 
    : () => undefined

  var thenPromise = new MyPromise((resolve, reject) => {
    const resolvePromise = (cb) => {
      queueMicrotask(() => {
        const x = cb(this.value)
        if (x === thenPromise) {
          throw TypeError('Chaining cycle detected for promise #<Promise>')
        }else if (x instanceof MyPromise) {
          x.then(resolve, reject)
        } else {
          resolve(x)
        }
      })
    }
    if (this.state === FULFILLED) {
      resolvePromise(onFulfilled)
    } else if (this.state === REJECTED) {
      resolvePromise(onRejected)
    } else {
      this.onFulfilledList.push(resolvePromise.bind(this, onFulfilled))
      this.onRejectedList.push(resolvePromise.bind(this, onRejected))
    }
  })
  return thenPromise
}
// var p4 = new MyPromise((resolve, reject) => {
//   resolve(4)
// })
// p4.then((res) => {
//   console.log('第一次调用then', res)
//   return 5
// }).then((res) => {
//   console.log('第二次链式调用then', res)
//   return 6
// }).then((res) => {
//   console.log('第三次链式调用then, return 一个promise', res)
//   return new MyPromise((resolve, reject) => {
//     resolve(7)
//   })
// }).then((res)=> {
//   console.log('第四次链式调用then,期待返回7', res)
// })


// const test3 = new MyPromise((resolve, reject) => {
//   resolve(100) // 输出 状态：成功 值： 200
//   // reject(100) // 输出 状态：失败 值：300
// }).then(res => 2 * res, err => 3 * err)
//   .then(res => console.log(res), err => console.log(err))

// 微任务

// const test4 = new MyPromise((resolve, reject) => {
//   resolve(100)
//   // reject(100)
// }).then(res => console.log('success', res), err => console.log('err', err))

// const test5 = new MyPromise((resolve, reject) => {
//   resolve(200)
// })
// var test6 = test5.then((res) => {
//   console.log(res)
//   return test6
// })

// console.log(1111)

// Promise.all 将多个promise的实例包装成一个promise的实例


// var p = new MyPromise(resolve => resolve(333))
// var rp = MyPromise.resolve(p)

// var rp2 = MyPromise.reject(p)
// console.log(rp2)

// var p1 = new MyPromise((resolve) => {
//   setTimeout(() => {
//     resolve(10)
//   }, 1000)
// })
// var p9 = new MyPromise((resolve, reject) => reject(5555))
// var p11 = new MyPromise((resolve, reject) => {
//   setTimeout(()=> {
//     reject(8888)
//   })
// })
// var p10 = new MyPromise((resolve, reject) => reject(6666))
// var p2 = new MyPromise((resolve) => resolve(20))
// var p3 = new MyPromise((resolve) => resolve(30))
// var p5 = 40
// var p4 = MyPromise.race([p9,p1, p2, p5])
// p4.then((res) => {
//   console.log('res', res) // 需要返回20
// }, (res) => {
//   console.log('reason', res)
// })

// https://wangdoc.com/es6/promise.html#promiserace

// MyPromise.resolve().then(()=>{
//   console.log(0)
//   return  MyPromise.resolve(4)
// }).then((res)=>{
//   console.log(res)
// })

MyPromise.resolve(1)
.then((res)=>{
  console.log(res)
}).then(3).then((res) => {
  console.log(res)
})