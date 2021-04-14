const a = [
  124
]

console.log(typeof a) // object
console.log(a instanceof Array) // true
console.log(Object.prototype.toString.call(a)) // [object Array]
console.log(Array.isArray(a)) // true
console.log(Array.prototype.isPrototypeOf(a)) // true
Object.getPrototypeOf(a) === Array.prototype; // true


