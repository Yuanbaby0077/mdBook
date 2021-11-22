// 就地结构

var persons = [
  { name: 'John Smith' },
  { name: 'Jane Doe' }
]

for (const {name} of persons) {
  console.log(name)
}

// 不能迭代数组 user is not iterable
// var user = {
//   name: 'zs',
//   age: 34
// }
// for (const u of user) {
//   console.log(u)
// }


// 类数组迭代

function sum() {
  let res = 0
  for(const arg of arguments) {
    console.log(arg) // 1,2,3
    res += arg
  }
  return res
}
console.log(sum(1,2,3))

// for of接受可迭代对象，字符串、数组、类数组、map、set

// map迭代

var _map = new Map()
_map.set('name', 'zs')
_map.set('age', 'ls')
_map.set('hobby', ['ball', 'swimming'])

for (const [key, value] of _map) {
  console.log(key, value)
}
//name zs
// age ls
// hobby (2) ["ball", "swimming"]

// 遍历DOM集合
const children = document.body.children;

for (const child of children) {
  console.log(child); // logs each child of <body>
}

// 性能 
// 在每次迭代中调用迭代器比通过增加索引访问的开销更大

// 生成器
// 迭代器 可迭代的对象



