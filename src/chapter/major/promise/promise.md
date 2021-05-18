## Promise状态

`Promise`有三种状态，`pending`|`fulfilled`|`reject`

当一个Promise处于
* `pending`状态，最终会过渡为`fulfilled` 或 `reject`状态
* `fulfilled`状态
    * 不会再过渡到其他状态
    * 一定会返回一个值，不会再变化
* `reject`状态
    * 不会再过渡到其他状态
    * 一定会返回一个异常结果


Promise的`then`方法接收俩参数，

`Promise.then(onFulfilled, onRejected)`

* `onFulfilled`: 可选，`promise` 是`fulfilled`之后调用，以Promise的返回值作为第一个参数，只会调用一次
* `onRejected`：可选，`promise` 是`rejected`之后调用，以Promise的返回值作为第一个参数，只会调用一次

`Promise.then`方法的返回也是一个`promise`

` promise2 = promise1.then(onFulfilled, onRejected);`

promise在实例化的时候就已经执行了

[promiseA+规范翻译](https://www.icode9.com/content-4-365156.html)

如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：[[Resolve]](promise2, x)

如果 x 有 then 方法且看上去像一个 Promise ，解决程序即尝试使 promise 接受 x 的状态；否则其用 x 的值来执行 promise 。

即

Promise.resolve()
  .then(() => {
    console.log(0)
    return Promise.resolve(1)
  })
  .then((res) => {
    console.log(res)
    return new Promise((resolve, reject) => reject(2))
  })
  .then(res=> {
    console.log('2', res)
    return res // 返回一个Number类型
  })
  .then(res=> {
    console.log('4', res) // 作为参数来执行promise
  })

当前then函数的回调函数的参数是由上一个then函数中的回调函数的返回值传入的。

1. 当上一个then函数的回调函数返回值的类型为基本类型如object，number等，则该返回值作为下一个then函数的回调函数的参数的值传入。

2. 当上一个then函数的回调函数返回值的类型为Promise<T>类型，则下一个then函数的回调函数的参数的值的类型为T即模板中指定的类型。

Promise.resolve(2) // resolve(2) 函数返回一个Promise<number>对象
.then(x=>{
   console.log( x ); // 输出2， 表示x类型为number且值为2，也就是上面resolve参数值
   return "hello world"; // 回调函数返回字符串类型，then函数返回Promise<string>
}) // then函数返回Promise<string>类型
.then(x=>{
   console.log( x ); // 输出hello world，也就是上一个then回调函数返回值，表明上一个then的返回值就是下一个then的参数
}) // then函数回调函数中没有返回值，则为Promise<void>
.then(x=>{ // 前面的then的回调函数没有返回值所以这个x是undefined
   console.log( x ); // undefined
}) // Promise<void>
.then(()=>{ // 前面没有返回值，这里回调函数可以不加返回值
   return Promise.resolve("hello world"); // 返回一个Promise<string>类型
}) // 这里then的返回值是Promise<string>
.then(x=>{ // 虽然上面的then中回调函数返回的是Promise<string>类型但是这里x并不是Promise<string>类型而是string类型
   console.log(x); // hello world
   return Promise.resolve(2); // 返回一个Promise<number>类型对象
})

## promise.all 实现

原理

Promise.all() 方法接收一个promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）的输入，并且只返回一个Promise实例， promiseAll的resolve回调的结果是一个数组。这个Promise的resolve回调执行是在所有输入的promise的resolve回调都结束，或者输入的iterable里没有promise了的时候

promise.all 如何防止某一个promise失败从而使整个promise 失败

## Promise.resolve(value)

* value如果是空值、基本类型、不带then方法的对象，那么，还是会返回一个Promise对象，value会作为参数传给then方法。

```
  Promise.resolve(2).then((res) => {
    console.log('====', res)
  })
```
* value如果是带then方法的对象，返回的Promise对象将由then方法来处理

```
  Promise.resolve(new Promise(resolve => resolve(2))).then((res) => {
    console.log('thenable', res)
  })
```

then 方法中的返回结果是一样的

## 20210516 promise 学习

创建Promise实例，必须传入回调函数

`new Promise() // Promise resolver undefined is not a function`



