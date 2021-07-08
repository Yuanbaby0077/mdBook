function _new(fn) {
  let obj = new Object()
  obj.__proto__ = fn.prototype
  const res = fn.apply(obj)
  return (res && typeof res === 'object') ? res : obj
}

function User(name, age) {
  this.name = 'zs'
  this.age = 21
}

/**
 * 需要实现 
 */
const myObj = _new(User)
console.log(myObj)
console.log(myObj.__proto__ === User.prototype)
