function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]'
}

function isArray(o) {
  return Object.prototype.toString.call(o) === '[object Array]'
}
// 浅拷贝，只进行一层拷贝
/**
 * for in + hasOwnProperty: 拷贝自身可枚举属性
 * @param {*} source 
 * @returns 
 */
function shallowClone(source) {
  const target = {}
  if (isObject(source)) {
    for (const k in source) {
      if (source.hasOwnProperty(k)) {
        target[k] = source[k]
      }
    }
  }
  return target
}

/**
 * Object.keys：拷贝自身可枚举属性
 * @param {*} source 
 * @returns 
 */
function _shallowClone(source) {
  const target = {}
  if (isObject(source)) {
    Object.keys(source).forEach(k => {
      target[k] = source[k]
    })
  }
  return target
}

/**
 * Object.getOwnPropertyNames：拷贝自身可枚举属性和不可枚举属性
 * @param {*} source 
 * @returns 
 */
function __shallowClone(source) {
  const target = {}
  if (isObject(source)) {
    Object.getOwnPropertyNames(source).forEach(k => {
      target[k] = source[k]
    })
  }
  return target
}

var s = {
  name: 'zs',
  child: {
    name: 'ls'
  }
}

Object.defineProperty(s, 'age', {
  enumerable: false,
  value: 34
})

var res = _shallowClone(s)
console.log(res, s, res.child === s.child) // false true

// 对象数组浅拷贝

var a = [
  {
    name: 'zs',
    age: 33
  }, {
    name: 'ls'
  }
]

var b = [].concat(a)
var c = a.slice()

a.push({name: 'ww'})
a[0].age = 44
c.push({name: 'zw'})
console.log('a=', a, 'b=', b, 'c=', c)


// 深拷贝： 无限层级拷贝
function deepClone(source) {
  if (!isObject(source)) return source
}

function createData(deep, breadth) {
  let temp = target = {}
  for (let i = 0; i < deep; i++) {
    temp['data'] = temp = {}
    for (let j = 0; j < breadth; j++) {
      temp[j] = j
    }
  }
  return target
}

console.log(createData(3, 2))
// 深拷贝解法一

function cloneJSON(data) {
  return JSON.parse(JSON.stringify(data))
}

// JSON.stringify内部使用递归的方式处理，当对象层级很深的时候会栈溢出
// 爆栈
// cloneJSON(createData(10000)) // RangeError: Maximum call stack size exceeded

// 循环引用：JSON.stringify 做了循环检测，没有栈溢出，
var o = {
  a: {}
}
o.a.b = o
// cloneJSON(o) // TypeError: Converting circular structure to JSON

// 深拷贝： 递归 自身可枚举属性

function deepCloneByRecurise(data) {
  if (!isObject(data)) return data
  let res = temp = {}
  for (const k in data) {
    if (data.hasOwnProperty(k)) {
      if (isObject(data[k])) {
        temp[k] = deepCloneByRecurise(data[k])
      } else {
        temp[k] = data[k]
      }
    }
  }
  return res
}

var d = {
  a: 2,
  b: 3,
  c: {
    a: 2,
    b: 3
  },
  d: {
    a: 2,
    b:4
  }
}
var res = deepCloneByRecurise(d)
// { a: 2, b: 3, c: { a: 2, b: 3, d: { a: 2, b: 4 } } }
// 使用createData创建深层对象，会爆栈
// var res = deepCloneByRecurise(createData(100000)) // RangeError: Maximum call stack size exceeded
console.log(res)

function deepCloneByLoop(data) {
  let res = {}
  const stack = [
    {
      parent: res,
      key: undefined,
      value: data
    }
  ]
  
  while(stack.length) {
    const popEle = stack.pop()
    let parent = popEle.parent
    const key = popEle.key
    const value = popEle.value
    let temp = parent
    if (key !== undefined) {
      temp[key] = temp = {}
      // temp = parent[key] = {} // 上面那行处理的结果，属性的顺序会发生变化
    }

    for (const k in value) {
      if (value.hasOwnProperty(k)) {
        if (isObject(value[k])) {
          stack.push(
            {
              parent: temp,
              value: value[k],
              key: k
            }
          )
        } else {
          temp[k] = value[k]
        }
      }
    }
  }
  return res
}

var d = {
  a: 2,
  b: 3,
  c: {
    a: 1,
    b: 2
  },
  d: 4,
  e: {
    a: 2,
    f: {
      name: '1',
      age: 34
    },
    b: 4
  }
}
console.log('深拷贝 循环')
var res = deepCloneByLoop(d)
console.log(res)// { a: 2, b: 3, d: 4, e: { a: 2, b: 4 }, c: { a: 1, b: 2 } }

var res = deepCloneByLoop(createData(10)) // 循环不会爆栈
console.log(res)

// 循环引用
// var res = deepCloneByLoop(o)
// console.log('循环引用', res) // 没解决

// 引用丢失问题

var b = {};
var a = {a1: b, a2: b};

a.a1 === a.a2 // true

var c = deepCloneByLoop(a);
console.log(c, c.a1 === c.a2) // false

function cloneForce(data) {
  let res = {}
  const uniqueList = []
  const stack = [
    {
      parent: res,
      key: undefined,
      value: data
    }
  ]
  
  while(stack.length) {
    const popEle = stack.pop()
    let parent = popEle.parent
    const key = popEle.key
    const value = popEle.value
    let temp = parent
    if (key !== undefined) {
      // temp[key] = temp = {}
      temp = parent[key] = {} // temp[key] = temp = {} 和当前实现的区别
    }

    // 缓存已经用过的对象
    const usedValue = find(uniqueList, value)
    if (usedValue) {
      parent[key] = usedValue.target
    } else {
      uniqueList.push(
        {
          source: value,
          target: temp
        }
      )
    }
    for (const k in value) {
      if (value.hasOwnProperty(k)) {
        if (isObject(value[k])) {
          stack.push(
            {
              parent: temp,
              value: value[k],
              key: k
            }
          )
        } else {
          temp[k] = value[k]
        }
      }
    }
  }
  return res
}

function find(arr, item) {
  for(let i = 0; i < arr.length; i++) {
    if (arr[i].source === item) {
        return arr[i];
    }
}

return null;
}

// 引用丢失问题
var c1 = {}
var a2 = {
  a1: c1,
  b1: c1
}
var res3 = deepCloneByLoop(a2)
console.log('引用丢失', res3, res3.a1, res3.b1)
var res2 = cloneForce(a2)
console.log('引用丢失不存在了', res2, res2.a1 === res2.b1) // true
var o = {}
o.o =o
var res = cloneForce(o)
console.log('循环引用破解了', res)