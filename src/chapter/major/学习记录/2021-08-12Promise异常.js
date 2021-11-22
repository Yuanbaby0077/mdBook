var thenable = {
  then: function(resolve) {
    throw new Error('error')
    resolve('resolved')
  }
}

// var p2 = Promise.resolve(thenable)
// p2.then((resolve) => {
//   console.log('thenable', resolve)
// }, (reject) => {
//   console.log('thenable reject', reject)
// })
// thenable Error: error

// thenable在resove之后抛出异常


var thenable = {
  then: function(resolve) {
    resolve('resolved')
    throw new Error('error')
  }
}

// var p3 = Promise.resolve(thenable)
// p3.then((resolve) => {
//   console.log('resolve', resolve) // 输出resolve resolved
// }, (e) => {
//   console.log(e) // 不会执行
// })


var p4 = new Promise((resolve, reject) => {
  throw new TypeError('type error====')
})
console.log(p4)

var p4 = new Promise((resolve, reject) => {
  reject('reject')
})

console.log('p4', p4)
p4.then((res) => {
  console.log(res)
}, () => {
  console.log('errr')
})