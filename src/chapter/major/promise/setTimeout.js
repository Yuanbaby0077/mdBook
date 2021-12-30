function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}

delay(1000)
  .then((res) => {
    setTimeout(() => {
      console.log('setTimeout1', new Date)
    }, 2000)
    console.log('execute after 1000ms', new Date())
    return delay(2000)
  })
  .then((res) => {
    setTimeout(() => {
      console.log('setTimeout2', new Date)
    }, 1000)
    console.log('execute after 2000ms', new Date())
  })
  .then((res) => {
    setTimeout(() => {
      console.log('setTimeout3', new Date)
    }, 3000)
    console.log('execute')
  })
  .then((res) => {
    console.log('execute after 50ms', new Date())
  })
