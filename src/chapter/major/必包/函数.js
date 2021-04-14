const toString = Object.prototype.toString

const isString = (obj) => {
  return toString.call(obj) === '[object String]'
}

const isNumber = (obj) => {
  return toString.call(obj) === '[object Number]'
}

console.log(isString('222'))
console.log(isNumber('222'))

// 偏函数
const isType = (type) => {
  return (obj) => {
    return toString.call(obj).slice(8, -1) === type
  }
}

const checkString = isType('String')
const checkNumber = isType('Number')

console.log(checkNumber(2))
console.log(checkString(''))
