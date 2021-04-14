// Object.create创建对象，第一个参数即该对象的__proto__对象
const ob = Object.create({a: 1, b: 2})
console.log(ob.__proto__) // { a: 1, b: 2 }

const on = Object.create(null)
console.log(on.__proto__) // undefined

ob.p = 1
on.p = 2

console.log(Object.getOwnPropertyNames(ob)) // [ 'p' ]
console.log(Object.getOwnPropertyNames(on)) // [ 'p' ]

console.log(ob.toString()) // [object Object]
// console.log(on.toString()) // TypeError: on.toString is not a function

console.log(ob.hasOwnProperty('p')) // true
// console.log(on.hasOwnProperty('p')) // TypeError: on.hasOwnProperty is not a function

console.log(ob.constructor) // [Function: Object]
console.log(on.constructor) // undefined

const of = {c: 1, d: 3}
console.log(Object.entries(of)) // [ [ 'c', 1 ], [ 'd', 3 ] ]

const od = Object.create({c: 1, d: 3}, {
  f: {
    value: 4,
    enumerable: true,
    writable: true,
    configurable: true
  }
})

console.log(Object.entries(od)) // [ [ 'f', 4 ] ]

// on.toString = Object.toString

// console.log(on.toString === Object.toString) // true

// console.log(on.toString()) // TypeError: Function.prototype.toString requires that 'this' be a Function
on.prototype = {}
on.prototype.toString = Object.toString
console.log(on.toString()) // TypeError: on.toString is not a function

