function convert(obj) {
  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    Object.defineProperties(obj, key, {
      get() {
        console.log(`getter ${key}=${value}`)
        return value
      },
      set(val) {
        console.log(`setter ${key}=${val}`)
        obj[key] = val
      }
    })
  })
}


window.dep = class Dep {

  constructor() {
    this.subscribers = new Set()
  }

  depend() {
    if (activeUpdate) {
      // register the current active update as a subscriber
    }
  }

  notify() {
    // run all subscriber functions
  }
}

let activeUpdate
/**
 * 
 * @param {*} update 更新函数
 */
function autorun(update) {
  function wrappedUpdate() {
    activeUpdate = wrappedUpdate
    update()
    activeUpdate = null
  }
}

autorun(() => {
  dep.depend()
})