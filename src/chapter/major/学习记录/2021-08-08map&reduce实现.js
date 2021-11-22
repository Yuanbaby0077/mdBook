// reduce 函数如果没有指定初始值，将使用数组第一个元素作为初始值，意味着
// 第一次调用就使用了第一个和第二个元素作为第一个和第二个参数的值

[1,2,3,4,5].reduce((acc, cur) => {
  console.log(acc, cur)
})
// 1, 2
// undefined, 3
// undefined, 4
// undefined, 5
var res = [1,2,3,4, 5].reduce((acc, cur) => {
  console.log(acc, cur)
  return acc + cur
}, 0)
// 0, 1
// 1, 2
// 3, 3
// 6, 4
// 10, 5
function divide2(x) {
  return x >> 1
}
var res = [2, 4, 6, 8].map(divide2)
console.log(res) // [1,2,3,4]

var map = Array.prototype.map
  ? function(arr, fn) { return arr.map(fn) }
  : function(arr, fn) {
    let results = []
    for (let i = 0; i < arr.length; i++) {
      if (i in arr) {
        console.log(i) // 0 2 3,4,5,7,8,9
        results[i] = fn.call(null, arr[i], i, arr)
      }
    }
    return results
  }

  console.log(map([0,, 2,3,4,5,,7, undefined, null], divide2))
/**
 * Array.prototype.reduce
    ? function(a, f, initValue) {
      return initValue ? a.reduce(f, initValue) : a.reduce(f)
    }
    : 
 * @param {*} arr 
 * @param {*} f 
 * @param {*} initValue 
 * @returns 
 */
// 实现步骤
// 判断是否传了初始值
// 1、传了初始值，从i = 0开始
// 2、没传初始值，以第一个元素作为初始值，从i=1
// 3、用上一个元素的执行结果res作为化简函数的第一个参数
var reduce = function(arr = [], f, initValue) {
  let res = null
  let i = 0
  if (arguments.length > 2) {
    res = initValue
  } else {
    res = arr[0]
    i++
  }
  
  for (i; i < arr.length; i++) {
    res = f.call(null, res, arr[i], i, arr)
  }
  return res
}

function add(x, y, i) {
return x + y
}

// reduce([1,2,3,4], add, 3)
reduce([], add, 3) // 3


console.log(reduce([], add, 3))
