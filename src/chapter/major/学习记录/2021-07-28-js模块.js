var Vue = (function() {
  function add(a, b) {
    return a + b
  }
  module.exports.add = add;
  return module.exports
})()

const value = Vue.add(10, 20)
console.log(Vue)



// 以前Javascript 是通过script来引入，当需要引入的js文件越来越多，就会产生：
// 变量污染，因为所有的文件都是顶层作用域，
// 文件依赖问题，
// CommonJS和ESModule都是解决：
// 解决变量污染问题，每隔模块都有独立的作用域，
// 文件里的代码清晰，容易维护
// commonJS 导入导出
module.exports = {
  add: Vue.add
}
// 也可以直接导出
exports.add = Vue.add

// 导入
require('./2021-07-28-js-拷贝')

// 重复导入不会重复执行

// 动态导入

// const res = [1,2,3].reduce((a, b) => {
//   console.log(a, b)
//   const math = require('./2021-07-28-js-import')
//   return math.minus(b, a)
// }, 0);
// console.log(res)

// 导入的值是拷贝的,可以修改拷贝的值

let { tar, num, changeNum, changeTar } = require('./2021-07-28-js-拷贝')
changeNum() // 模块里改为2
changeTar('ls', tar)
console.log(num) // 1 不变
console.log(tar.name) // ls 浅拷贝
console.log(num)
