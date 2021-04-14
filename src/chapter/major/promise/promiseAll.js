// const promise1 = new Promise(resolve => {
//   setTimeout(() => {
//     resolve(1)
//   }, 1000)
// })
// const promise3 = new Promise(resolve => {
//   setTimeout(() => {
//     resolve(3)
//   }, 2000)
// })
// const promise2 = Promise.reject(2000)

// promise.all 中同步执行

// console.log(Date.now())
// Promise.all([promise1, promise3])
//   .then(() => {
//     console.log(Date.now())
//     console.log('finish')
//   })
//   .catch(() => {
//     console.log('reject')
//   })

// 防止某一个promise 失败导致promise.all是吧

// 方法一：allSettled
// Promise.allSettled([promise1, promise2])
//   .then((res) => {
//     console.log('finish')
//   })
//   .catch(() => {
//     console.log('reject')
//   })

// 方法二： catch每个promise的异常

// Promise.all(
//   [
//     promise1.catch(() => {console.log('error')}),
//     promise2.catch(() => {})
//   ]
// )
//   .then((res) => {
//     console.log('finish', res)
//   })
//   .catch(() => {
//     console.log('reject')
//   })

const p1 = new Promise((res, rej) => {
  setTimeout(() => {
    res(1)
  }, 2000)
})

const p2 = new Promise((res, rej) => {
  setTimeout(() => {
    res(2)
  }, 1000)
})
const p3 = new Promise((res, rej) => {
  setTimeout(() => {
    res(3)
  }, 3000)
})


// Promise.all([p1, p2, p3])
//   .then((res) => {
//     console.log('=======', res)
//   })
//   .catch((e) => {
//     console.log(e)
//   })

// 实现一个promise.all

function promiseAll(promiseArray) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promiseArray)) return

    const outputList = []
    let counter = 0
    for (let i = 0; i < promiseArray.length; i++) {

      // if (Object.prototype.toString.call(promiseArray[i]) === '[object Promise]') {
      //   promiseArray[i].then((res) => {
      //     outputList.push(res)
      //   })
      // } else {
      //   outputList.push(promiseArray[i])
      // }
      Promise.resolve(promiseArray[i]).then(value => {
        // outputList.push(value)
        console.log(value, outputList) // 依次返回4 2 1 3
        // promise执行顺序会有问题
        // if (outputList.length === promiseArray.length) {
        //   resolve(outputList)
        // }
        counter ++
        outputList[i] = value
        if (counter === promiseArray.length) {
          resolve(outputList)
        }
      })
      .catch((e) => {
        console.log(e)
      })
    }
  })
}

promiseAll([p1, p2, p3, 4])
  .then((res) => {
    console.log('res', res)
  })