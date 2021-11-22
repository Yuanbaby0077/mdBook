var i = 10000000
var cnt = 0
console.log(new Date)
const timer = setInterval(() => {
  var data = createData(i)
  console.log(data, i ,++cnt)
  i += 1
  console.log(new Date)
}, 1000)


setTimeout(() => {
  console.log('到shi jia')
  if (i >= 100000009) {
    console.log('setTimeout', new Date)
    clearInterval(timer)
  }
}, 12000)
function createData(deepth) {
  const data = temp = {}
  for (let i = 0; i < deepth; i++) {
    temp['data'] = temp = {}
  }
  return data
}

