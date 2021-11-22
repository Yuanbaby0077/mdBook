function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]'
}

function isArray(o) {
  return Object.prototype.toString.call(o) === '[object Array]'
}

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
      // 更新当前对象的引用指向
      parent[key] = usedValue.target
      continue
    } 
    uniqueList.push(
      {
        source: value,
        target: temp
      }
    )
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

var o = {
  a: 1,
  b2: 2,
  c3: 3,
  d: {
    a2: 2,
    b3: 4,
    e: {
      a3: 3,
      c4: 3
    }
  },
  e: 5
}
// var k = cloneForce(o)
// console.log('正常深拷贝' , o)
// 引用丢失问题
var c1 = {
  name: 'zs'
}
var a2 = {
  a1: {
    a2: c1
  },
  c2: c1,
  b1: c1
}
var res2 = cloneForce(a2)
console.log('引用丢失不存在了', res2, res2.a1.a2 === res2.b1) // true

// 循环引用问题

var b = {
  name: 'ls'
}
var k = {
  a: 1
}
k.b = k
var res3 = cloneForce(k)
console.log('循环引用问题', res3)