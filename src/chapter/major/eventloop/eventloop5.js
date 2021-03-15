
const p = function() {
  return new Promise((resolve, reject) => {
    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1)
      }, 0)
      // resolve(2)
    })
    p1.then((res) => {
      console.log(res)
    })
    console.log(3)
    resolve(4)
  })
}
p().then((res) => {
  console.log(res)
})

console.log('end')

// 3
// end
// 2
// 4

// 注释第8行代码

// 3
// end
// 4 
// 1
