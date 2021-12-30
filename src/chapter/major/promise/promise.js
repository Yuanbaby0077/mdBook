setTimeout(() => {
  console.log('setTimeout', 1000)
}, 0)

const now = Date.now()
let i = 0
while(i < 10) {
  new Promise((resolve) => {
    resolve(++i)
  }).then(() => {
    console.log('i=', i)
  })
}