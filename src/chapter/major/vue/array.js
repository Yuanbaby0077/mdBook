const arrayProto = Array.prototype

const arrayObj = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

methodsToPatch.forEach((m) => {
  Object.defineProperty(arrayObj, m, {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (...args) => {
      return arrayProto[m].apply(this, args)
    }
  })
})

// arrayObj['push'](1,2,3,4)
// arrayObj['push'](9, 0)

(function(window) {
  console.log(window, this)
})(window)
