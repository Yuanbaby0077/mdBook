var demo1 = require('./demo12')
// var Person = require('./demo2')
var demo3 = require('./demo3')
// var demo4 = require('./demo4')

console.log(demo1)

// var per = new Person('zs', 23)
// console.log(per.getName())

console.log('demo3', demo3)
// console.log('demo4', demo4)
var cache1 = require('./cache')
exports.name = 'az'
console.log(module.exports === exports) // true

console.log(arguments)

var cache2 = require('./cache')
console.log(cache1, cache2)

