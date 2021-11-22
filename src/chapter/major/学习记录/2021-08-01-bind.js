Function.prototype._bind = function(o) {
  const self = this
  const args = [...arguments].slice(1)
  const fn = function() {
    const fnArgs = [...arguments].slice(0)
    const _args = args.concat(fnArgs)
    this.z = 6
    return self.apply(this instanceof fn ? this : o, _args)
  }
  fn.prototype = this.prototype
  return fn
}

var o = {
  z: 2
}
function add(x, y) {
  this.x = x
  this.y = y
  console.log('=======', this)
  return this.z + x + y
}
var bindFn = add._bind(o, 3)
// var res = bindFn(4)

var bindCtor = new bindFn(5)

var _bindFn = add.bind(o, 11)
var realBindCtol = new _bindFn(8)

// const a = new add(3,4)

// add.bind(o, 3) 返回的函数不包含prototype属性

var o = {
  x: 1, y: 2
}
function inherit(o) {
  if (o === null) throw TypeError()
  if (Object.create) return Object.create(o)
  function f() {}
  f.prototype = o
  return new f()
}

var a = inherit(o)
a.x = 3

console.log(a.x, a.y, o)
