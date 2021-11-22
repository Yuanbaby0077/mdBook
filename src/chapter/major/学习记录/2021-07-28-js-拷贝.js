
const copyFn = (function() {
  // 校验是否是对象
  function isObject(tar) {
    return Object.prototype.toString.call(tar) === "[object Object]"
  }

  function isArray(tar) {
    return Object.prototype.toString.call(tar) === "[object Array]"
  }

  function loop(tar, res) {
    // for in 遍历自身以及原型链上的可枚举属性
    for (const key in tar) {
      console.log('target', key, tar.hasOwnProperty(key))
      if (tar.hasOwnProperty(key)) { // 对象自身属性中是否具有指定的属性
        res[key] = tar[key]
      }
    }
  }
  const res = {}
  function shallowClone(tar) {
    if (isArray(tar)) {
      for (let i = 0; i < tar.length; i++) {
        return shallowClone(tar[i], res)
      }
    } else if (isObject(tar)) {
      loop(tar, res)
    }
    return res
  }

  function shallowCloneForObjectKeys(tar) {
    const res = {}
    // Object.keys用于获取自身可枚举属性
    // 等价于 for in + tar.hasOwnProperty(key)
    Object.keys(tar).forEach((key) => {
      res[key] = tar[key]
    })
    return res
  }

  function shallowCloneForOwnNames(tar) {
    const res = {}
    // 用于获取对象自身的属性名[包括可枚举和不可枚举]
    var keys = Object.keys(tar) // [ 'name', 'children' ] 
    var names = Object.getOwnPropertyNames(tar) // [ 'enum', 'name', 'children' ]
    names.forEach(name => {
      res[name] = tar[name]
    })
    return res
  }

  /**
   * 深拷贝
   */

  function deepCloneForJSON(tar) {
    return JSON.parse(JSON.stringify(tar))
  }

  /**
   * 递归
   * @param {*} tar 
   */
  function deepClone(tar) {
    let res = {}
    for (const key in tar) {
      res[key] = null
      const value = tar[key]
      if (tar.hasOwnProperty(key)) {
        if (isObject(value)) {
          res[key] = deepClone(value)
        } else if (isArray(value)) {
          res[key] = []
        } else {
          res[key] = value
        }
      }
    }
    return res
  }

  function deepCloneByLoop(tar) {
    const root = {}
    const stack = [
      {
        parent: root,
        data: tar,
        key: undefined
      }
    ]
    while(stack.length) {
      const node = stack.pop()
      let parent = node.parent
      const data = node.data
      const key = node.key

      if (key !== undefined) {
        parent = parent[key] = {}
      }

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (isObject(data[key])) {
            stack.push(
              {
                parent,
                data: data[key], // 保存当下key对应的值
                key: key
              }
            )
          } else {
            parent[key] = data[key]
          }
        }
      }
    }

    return root;
}

  function createDataForDeepAndBreadth(deep, breadth) {
    var data = {};
    var temp = data;

    for (var i = 0; i < deep; i++) {
        temp = temp['data'] = {};
        for (var j = 0; j < breadth; j++) {
            temp[j] = j;
        }
    }

    return data;
  }
  module.exports = {
    shallowClone,
    shallowCloneForObjectKeys,
    shallowCloneForOwnNames,
    createDataForDeepAndBreadth,
    deepCloneForJSON,
    deepClone,
    deepCloneByLoop
  }
  return module.exports
})()

var targetObj = {
  enum: true,
  name: 'zs',
  children: [
    {
      name: '11'
    },
    {
      name: '22'
    }
  ]
}

var arrayObj = [
  {
    name: '11'
  },
  {
    name: '22'
  }
]
// 将enum设置为不可枚举，就不会被拷贝
Object.defineProperty(targetObj, 'enum', {
  enumerable: false
})
var res = copyFn.shallowClone(arrayObj)

// res.name = 'ls'
// res.children[0].name = '000'
// console.log(res) // {name: 'ls', ......}
// console.log(arrayObj) // {name: 'zs', ......}
// 内存溢出 near heap limit Allocation failed - JavaScript heap out of memory
// console.log(copyFn.createDataForDeepAndBreadth(300000000000))
// 栈溢出 Maximum call stack size exceeded
// console.log(copyFn.deepCloneForJSON(copyFn.createDataForDeepAndBreadth(100000)))
// 循环引用 有检测 不会导致溢出
// var a = {}
// a.a = a
// console.log(copyFn.deepCloneForJSON(a)) // TypeError: Converting circular structure to JSON


// 深拷贝
  var deep = {
    name: 11,
    baseInfo: {
      type: 2,
      status: 3,
      repos: {
        name: 'repo1',
        matype: 'SVN'
      }
    }
  }
  console.log('=========深拷贝==========')
  // var res = copyFn.deepClone(deep)
  var res = copyFn.deepCloneByLoop(deep)
  console.log(res)
// 文章
// https://yanhaijing.com/javascript/2015/05/09/diff-between-keys-getOwnPropertyNames-forin/
// https://juejin.cn/post/6844903692756336653