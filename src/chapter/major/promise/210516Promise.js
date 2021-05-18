const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise1 {
  value = null
  err = null
  status = PENDING
  pm = null
  onFulfilledCallbacks = []
  onRejectedCallbacks = []

  constructor(exector) {
    exector(this.resolved, this.rejected)
  }

  resolved = (val) => {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = val
      while(this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()(this.value)
      }
    }
  }

  rejected = (err) => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.err = err
      while(this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(this.value)
      }
    }
  }

  then = (onFulfilled, onRejected) => {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status === REJECTED) {
      onRejected(this.err)
    }

    if (this.status === PENDING) {
      this.onFulfilledCallbacks.push(onFulfilled)
      this.onRejectedCallbacks.push(onRejected)
    }
  }
}

const p1 = new MyPromise1((resolve, reject) => {
  if (true) {
    setTimeout(() => {
      resolve(22)
    }, 0)
  } else {
    reject('promise rejected')
  }
})

p1.then((res) => {
  console.log('then res=', res)
}, (err) => {
  console.log('then err', err)
})
