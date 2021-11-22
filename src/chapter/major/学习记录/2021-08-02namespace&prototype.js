var Set = (function invocation() {
  function Set() {
    this.size = 0
    this.value = {}
  }

  Set.prototype.size = function() {
    return this.size
  }

  Set.prototype.add = function(key, value) {
    if (!isObject(key)) {
      console.log(this.value, key, value)
      this.value[key] = value
      this.size++
    }
  }

  function isObject(tar) {
    return Object.prototype.toString.call(tar) === "[object Object]"
  }
  return Set
})()


var d = new Set()
d.add('name', 'zs')
console.log(d.size, d.value)

function add() {
  console.log(arguments)
  for (let a of arguments) { // 遍历可枚举属性以及原型链上的属性
    console.log(a)
  }
}

add(2,3,4)

/**
 * 构造函数也能是工厂函数，不论调用函数是否用了new，都能正确的创建实例
 * @param {*} from 
 * @param {*} to 
 * @returns 
 */
function _Range(from, to) {
  const props = {
    from: {
      value: from,
      enumerable: false,
      configurable: false,
      writable: false
    }
  }
  if (this instanceof _Range) {
    return Object.defineProperties(this, props)
  }
  console.log(_Range.prototype)
  return Object.create(_Range.prototype, props)
}
 
for(const a in Object.prototype) {
  console.log('a', a)
}

console.log(Object.getOwnPropertyNames(Object.prototype)) // 可枚举和不可枚举的自身属性


function inherit(o) {
  if (Object.create) return Object.create(o)
  var fn = function() {
    console.log(this)
  }
  fn.prototype = o
  return new fn()
}
var o = {
  a: 1,
  b: 2
}

var p = inherit(o)

p.c = 3

var q = inherit(p) 
q.e = 5
var s = q.toString() // [object Object],toString()继承自Object
var r = p.a + q.c // 4，这里的p.a继承自o,q.c继承自p

Object.defineProperty(q, 'd', {
  enumerable: false
})
console.log(q.hasOwnProperty('a')) // 继承属性 false
console.log(q.hasOwnProperty('d')) // 不可枚举属性 true
console.log(q.hasOwnProperty('e')) // 可枚举属性 true

console.log(q.propertyIsEnumerable('d')) // false 不可枚举属性
console.log(q.propertyIsEnumerable('a')) // false 继承属性
console.log(q.propertyIsEnumerable('e')) // true 可枚举属性

console.log(q.toString !== undefined) // true 继承属性
console.log(q.d !== undefined) // false 自有的不可枚举属性,
console.log(q.x !== undefined) // false 不存在
console.log(q.e !== undefined) // true 自有的可枚举属性