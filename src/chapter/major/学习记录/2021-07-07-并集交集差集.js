// set

var a = new Set([1,2,3,4])
var b = new Set([3,4,5,6,7])

// 并集 去重复
var c = new Set([...a, ...b])
console.log(c)

// 交集 共同存在的
var d = [...a].filter(i => b.has(i))
console.log(d)

// 差集 a中存在 b中不存在的

var e = [...a].filter(i => !b.has(i))

console.log(e)