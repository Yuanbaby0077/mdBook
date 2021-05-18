// 1 + {} 和 {} + 1为何不等

var a = 1 + {} // 1[object Object]

var b = {} + 1 // [object Object]1

1 + {} // 1[object Object]

{} + 1 // 1

// {} + 1 为什么等于1
// 因为这里的{}被解释为代码块，而不是对象，根据JavaScript 的解析顺序，{} 作为空代码块被省略，执行的是 + 1

// 1 + {} 
// + 被解析成二元运算符，然后解析到{}，就相等于一个基本类型 + 对象类型
// Object.prototype.toString({}) // "[object Object]"


1 + []; // [].toString() => '' => 1 + '' = '1'

[] + 1 // '1'

