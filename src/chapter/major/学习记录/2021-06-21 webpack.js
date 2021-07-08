// eval('exports.default = function(a, b) {return a + b}')
// const a = exports.default(2, 3)
// console.log(a) // 5
// 模拟require
// (
//   function(exports, code) {
//     var a = eval(code)
//     exports.default = a
//     console.log(a(6,5))
//   }
// )(exports, 'exports.default = function(a, b) {return a + b}')
// console.log(require('./index'))
(function(list) {
  function requireFn(file) {
    return eval(list[file])
  }
  const a = requireFn('index.js')
  console.log(a)
})(
  {
    'index.js': 'var add = require("./index.js").default; add(4,2)'
  }
)
