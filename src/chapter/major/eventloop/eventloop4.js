console.log('start')
setTimeout(() => {
  console.log('setTimeout start')
  Promise.resolve().then(() => {
    console.log('promse1')
  })
}, 0)

new Promise(function(resolve, reject) {
  console.log('promise2')
  setTimeout(function() {
    console.log('setTimeout2 start')
    resolve(5)
  }, 0)
}).then((res) => {
  console.log('promise end')
  setTimeout(() => {
    console.log(res)
  }, 0)
})

// start
// promise2
// 第一轮宏任务执行结束 尝试清空微任务队列， 没有微任务
// 执行下一轮宏任务
// setTimeout start 微任务队列
// 第二轮宏任务结束，清空微任务队列
// promse1
// 第三轮宏任务开启 
// setTimeout2 start then 放入微任务
// 宏任务执行结束 尝试清空微任务
// promise end
// 5