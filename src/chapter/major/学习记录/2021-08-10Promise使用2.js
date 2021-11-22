// Promise.resolve().then(() => {
//   console.log(1)
// }).then(() => {
//   setTimeout(() => {
//     console.log(3)
//   })
// }).then(() => {
//   console.log(5)
// })
setTimeout(() => {
  console.log('setTimeout 1')
}, 2000)
Promise.resolve().then(() => {
  console.log(2)
}).then(() => {
  setTimeout(() => {
    console.log(4)
  })
}).then(() => {
  console.log(6)
})

setTimeout(() => {
  console.log('setTimeout 2')
}, 1000)

// 2 6 4 setTimeout2 setTImeout1
