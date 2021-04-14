const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  value = null
  reason = null
  status = PENDING
  onFulfilledList = []
  onRejectedList = []

  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch(e) {
      this.reject(e)
    }
  }

  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      while (this.onFulfilledList.length) {
        this.onFulfilledList.shift()(this.value)
      }
      // if (this.onFulfilled) {
      //   this.onFulfilled(this.value)
      // }
    }
  }

  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      // if (this.onRejected) {
      //   this.onRejected(this.reason)
      // }
      while (this.onRejectedList.length) {
        this.onRejectedList.shift()(this.reason)
      }
    }
  }

  // onFulfilled = null
  // onRejected = null

  then = (onFulfilled, onRejected) => {
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        queueMicrotask(() => {
          try {
            const res = onFulfilled(this.value)
            resolvePromise(promise2, res, resolve, reject)
          } catch(e) {
            reject(e)
          }
        })
      }
  
      if (this.status === REJECTED) {
        onRejected(this.reason)
      }
  
      if (this.status === PENDING) {
        // this.onFulfilled = onFulfilled
        // this.onRejected = onRejected
        this.onFulfilledList.push(onFulfilled)
        this.onRejectedList.push(onRejected)
      }
    })
    return promise2
  }
}

// then方法return基本数据类型，调用resolve改变promise2状态为fulfilled，
// then方法return promise对象
resolvePromise = (promise2, res, resolve, reject) => {
  if (promise2 === res) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if (res instanceof MyPromise) {
    res.then(resolve, reject)
  } else {
    resolve(res)
  }
}

// 没有输出 因为当前Promise处于Pending 状态，没有处理异步操作，于是先执行了promise.then,
// promise.then里面没有处理pending的情况，于是就没有执行
// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('success')
//   }, 3000)
// })

// promise.then((value) => {
//   console.log(1)
//   console.log(value)
// })

// 下面只返回了第二个promise.then中onFulfilled的执行
// 因为this.onFulfilled只保存了最后一次调用promise.then中传递的onFulfilled
// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('success')
//   }, 500)
// })

// promise.then((value) => {
//   console.log(1)
//   console.log(value)
// })

// promise.then((value) => {
//   console.log(2)
//   console.log(value)
// })

// 链式调用
// then方法需要返回promise
// then方法里面return一个返回值作为下一个then方法的参数，如果return的是Promise 对象，


// const promise = new MyPromise((resolve, reject) => {
//   resolve('success')
// })

// promise.then(() => {
//   console.log(1)
//   return promise
// }).then((value) => {
//   console.log(2, value)
//   return new MyPromise((resolve, reject) => {
//     resolve('kkk')
//   })
// })
// .then((value) => {
//   console.log(value)
// })

//检测promise.then方法是否返回自己的promise对象
// const promise = new MyPromise((resolve, reject) => {
//   resolve('success')
// })

// const p1 = promise.then(value => {
//   console.log('resolve', value)
//   return p1
// })


// 运行的时候会走reject
// p1.then(value => {
//  console.log('resolve', value)
// }, reason => {
//  console.log('reason', reason.message)
// })


// 捕获执行器的错误

// const promise = new MyPromise((resolve, reject) => {
//   throw new Error('这里有个异常')
//   // resolve('success')
// })

// const p1 = promise.then(value => {
//   console.log('resolve', value)
// }, (reason) => {
//   console.log('error', reason)
// })

// 捕获then方法中的错误
const promise = new MyPromise((resolve, reject) => {
  resolve('success')
})

const p1 = promise.then(value => {
  throw new Error('then这里有个异常')
}, (reason) => {
  console.log('error', reason)
}).then(() => {
  console.log('then==========')
}, (error) => {
  console.log('捕获异常', error)
})
.then(() => {
  console.log('zhengchang ')
})
console.log('================')
// const promise1 = new Promise((resolve, reject) => {
//   resolve(100)
// })
// const p2 = promise1.then(value => {
//   console.log(value)
//   return p2
// })
// console.log('================')

// const p3 = new Promise((resolve, reject) => {
//   resolve(1)
// })
// .then((value) => {
//   throw new Error('error')
//   // console.log(value)
// }, (reason) => {
//   console.log('1', reason)
// })
// .then((value) => {
//   console.log(value)
//   return new Promise((resolve) => {
//     resolve(3)
//   })
// }, (reason) => {
//   console.log(2, reason)
// })
// .then((value) => {
//   console.log(value)
//   return Promise.resolve(4)
// })
// .then((value) => {
//   console.log(value)
//   return () => {
//     console.log('555')
//     return 5
//   }
// })
// .then((value) => {
//   console.log(value)
// })
