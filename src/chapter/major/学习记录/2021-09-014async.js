
function _request(params) {
  setTimeout(() => {
    console.log(new Date, params)
  }, 1000)
  return params
}
function __request(params) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(params)
      console.log(new Date, params)
    }, 2000)
  })
}

async function request(params) {
  // setTimeout(() => {
  //   console.log(new Date, params)
  // }, 2000)
  return params
}
console.log(request(4))
async function fn() {
  await request(11)
  await request(22)
}

fn()