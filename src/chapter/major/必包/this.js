const obj = {
  name: 'sz',
  fn: function() {
    console.log(this)
    const that = this
    function getProp() {
      console.log(that)
      return that.name
    }
    return getProp
  },
  arrowFn: function() {
    const fn = (() => this.name)
    return fn
  }
}

console.log(obj.fn()()) // sz
console.log(obj.arrowFn()()) // sz

const ref = obj.arrowFn
console.log(ref()()) // undefined


function sum(a, b) {
  return a + b
}

var o = {
  num: 1,
  fn: function() {
    function handler() {
      return this.sum = sum(this.num, this.num)
    }
    return handler()
  }
}

console.log(o.fn())

var o2 = {
  num: 1,
  fn: function() {
    const that = this
    function handler() {
      return that.sum = sum(that.num, that.num)
    }
    return handler()
  }
}

console.log(o2.fn())
