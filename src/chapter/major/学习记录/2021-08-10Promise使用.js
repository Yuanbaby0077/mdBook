var p1 = Promise.resolve(2)
console.log(p1) // Promise {<fulfilled>: 2}
p1.then(res => {
  console.log(res) // 2
})

// var p2 = Promise.reject(2)

// console.log(p2) // Promise {<rejected>: 2}

// Promise.resolve(value)方法的参数如果是一个Promise对象，则直接返回这个Promise对象。
var original = Promise.resolve(33)
var target = Promise.resolve(original)
target.then(res => {
    console.log(res) // 33
  })
console.log('target === original', target === original) // true

// Promise.resolve(value)方法的参数，如果这个值是thenable，返回的promise会
// 跟随thenable的最终状态返回。
var res = Promise.resolve(Promise.resolve('success').then((res) => {console.log(res)}))
console.log(res) 
// 先输出 Promise {<pending>} 
// 然后输出 success

var res = Promise.resolve([1,2,3,4])
  .then(res => {
    console.log(...res) // 1 2 3 4
  })

var obj = {
  then: function(fulfilled, onrejected) {
    fulfilled('success=====')
  }
}
var res = Promise.resolve(obj)
console.log('resolve中传入一个含有then方法的对象', res)

res.then((_) => {
  console.log(_)
})
// success=====


// then方法使用
// 1、then方法接受个参数，fulfilled函数和rejected函数
// 2、支持链式调用
// 3、如果resolve在setTimeout的回调中执行，那么then方法会在setTimeout回调后执行。

var p2 = new Promise((resolve) => {
  console.log(+new Date())
  setTimeout(() => {
    resolve('setTimeout success')
  }, 1000)
})
p2.then((res) => {
  console.log(+new Date())
  console.log(res)
})

var p1 = new Promise((resolve) => {
  resolve('then1 success')
})

p2 = p1.then((res)=> {
  console.log(res)
  return 2
}).then(res => {

  console.log('链式调用then', res, this)
  // 如果返回值是Promise，且是失败的，那么新的Promise就失败
  // 如果返回值是Promise，且是成功的，那么新的Promise就成功
  // 如果返回值不是Promise，那么新的Promise就是成功的。
  return new Promise((resolve, reject) => {
    // reject('then return promise reject')
    resolve('then return promise resolve')
  })
}).then((res) => {
  console.log('success=====', res) // undefined
  return 2
}, (reason) => {
  console.log('reason=======', reason)
})
// then的返回值和then的回调的返回值不能是同一个
// TypeError: Chaining cycle detected for promise #<Promise>
// p10 = p2.then((res) => {
//   console.log('上一个then的返回值不是Promise对象', res) // 2
//   return p10
// })

p1 = new Promise(resolve => {
  setTimeout(()=> {
    resolve(30)
  }, 1000)
})
p2 = new Promise(resolve => resolve(40))
p3 = new Promise(resolve => resolve(50))
p0 = 20
p4 = (x) => x
p5 = new Promise((resolve, reject) => reject('err1'))
p6 = new Promise((resolve, reject) => reject('err2'))
var a = Promise.all([p1, p2, p3, p4, p5, p6])
console.log(a)
a.then((res) => {
  console.log(res) // [30, 40, 50, function]
}, (err) => {
  console.log(err) // err1
})


var r = Promise.race([p0, p1, p2, p3, p0])
r.then((res) => {
  console.log('res=====', res)
})

//不知道或者不想区分，函数f是同步函数还是异步操作，
// 但是想用 Promise 来处理它。因为这样就可以不管f是否包含异步操作，
// 都用then方法指定下一步流程，用catch方法处理f抛出的错误。

var syncFn = () => {
  console.log('同步函数')
}

// Promise.resolve().then(syncFn)

// 上面实现的缺点是：如果是同步函数，那么它将在本轮事件循环的末尾执行

console.log('1111111111');

// 同步函数同步执行，异步函数异步执行，并且API一致
// 使用立即执行函数， 返回执行后的结果
// 方法一：async 函数返回promise
// var f = (async () => syncFn())()
// console.log('f', f)
// f.then(() => {
//   console.log('then==========')
// })
// .catch(() => {

// });

// 方法二：使用promise

var f2 = (() => new Promise((resolve, reject) => {
  resolve(syncFn())
}))();

f2.then((res) => {
  console.log('f2', res)
})

// 立即执行函数 会立即执行里面的async函数，当syncFn是同步的，就会得到同步的结果，
// 如果是异步的，可以用then指定

console.log('222222')





