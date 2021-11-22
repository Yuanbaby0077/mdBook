# Prototype

Javascript的每一个对象（null除外）都和另一个对象关联，另一个对象就是原型，每一个对象都从原型继承属性。

## 创建对象

### 对象直接量

每一个通过对象直接量创建的对象都具有同一个原型对象，可以通过`Object.prototype`来获得对原型对象的引用
```
var empty = {}
var point = { x: 0, y: 0 }
Object.getPrototypeOf(empty) === Object.getPrototypeOf(point) // true
empty.__proto__ === point.__proto__ // true
```

### new关键字创建对象

通过new关键字和构造函数创建的对象的原型就是构造函数的prototype属性的值
```
var a = new Array() 

a.__proto__ === Array.prototype // true
```

`Object.prototype`没有原型，他不继承任何属性，所有的内置构造函数和自定义的构造函数都有一个继承自`Object.prototype`的原型。例如，Date.prototype的属性继承自Object.prototype,因此new Date()创建的对象，同时继承了Date.prototype和Object.prototype。这一系列链接的原型对象就是所谓的“原型链”。

### Object.create()

Object.create()创建一个新对象，第一个参数就是这个对象的原型。

这是一个静态函数，

```
var a = Object.create(null) // 创建了一个没有原型的对象,不继承任何东西，甚至基础方法，比如toString()
```

如果要创建一个普通的空对象，像{} 或者 new Object()创建的对象，需要传入 `Object.prototye`

```
  var a = Object.create(Object.prototype)
```

#### 拓展： 通过原型继承创建一个对象

```
function inherit(o) {
    if (Object.create) return Object.create(o)
    var fn = function() {}
    fn.prototype = o // fn构造函数创建的对象继承了o对象的属性和方法
    return new fn()
}
```

## 继承

JS中，只有查询属性才会体会到继承的存在，设置属性和继承无关。

```
var o = {
  a: 1,
  b: 2
}

var p = inherit(o)

p.c = 3
q.e = 8
var q = inherit(p) 
var s = q.toString() // [object Object],toString()继承自Object
var r = p.a + q.c // 4，这里的p.a继承自o,q.c继承自p
```

## 检测属性

`hasOwnProperty`检测自有的可枚举和不可枚举属性
`propertyIsEnumerable`检测自有的可枚举属性
`!==`检测属性是否存在，包括自有的和原型上继承的属性
```
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
console.log(q.d !== undefined) // true 自有的不可枚举属性
console.log(q.x !== undefined) // false 不存在
console.log(q.e !== undefined) // true 自有的可枚举属性
```

### for in

遍历对象中的可枚举属性，包括继承属性。为了过滤`for/in`循环返回的属性，使用
```
for (k in o) {
  if (!o.hasOwnProperty(k)) continue // 跳过继承的属性
}
for (k in o) {
  if (typeof o[k] === 'function') continue // 跳过方法
}
```

`Object.keys`返回对象的自有属性中可枚举属性的名称
`propertyIsEnumerable`判断自有属性中可枚举的属性
`Object.getOwnPropertyNames`返回对象的自有属性中所有属性的名称（可枚举和不可枚举）
`hasOwnProperty`也是用于判断对象自有属性中可枚举和不可枚举属性



