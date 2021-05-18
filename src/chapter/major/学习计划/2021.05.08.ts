// 1、vue/shared/util.js 源码

import { valueOf } from "../vue/技巧"

// 谓词函数 大概就是返回值为boolean的函数

// 判断基本数据类型

function isPrimitive(val) {
  return typeof val === 'string'
    || typeof val === 'number'
    || typeof val === 'boolean'
    || typeof val === 'symbol'
}

function isDef(val) {
  return val !== undefined && val !== null
}

function isPromise(val: any) :boolean {
  console.log('isPromise')
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

// Camelize a hyphen-delimited string
const camelizeRE = /-(\w)/g
// function camelize(str) {
//   return str.replace(camelizeRE, (_, p1) => {
//     return p1 ? p1.toUpperCase() : ''
//   })
// }

// const res = camelize('wizard-job-slave')
// console.log(res)

function cached(fn) {
  const cache = Object.create(null)
  return (str) => {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

/**
 * Camelize a hyphen-delimited string.
 */
const camelizeOpt = cached((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

const capitalize = cached((str) => {
  const str0 = str.charAt(0)
  return str.replace(str0, str0.toUpperCase())
})

const capitalize2 = cached((str) => {
  const str0 = str.charAt(0).toUpperCase()
  return str0 + str.slice(1)
})

console.log(capitalize('wizardJobQrcode'))

// console.log(camelizeOpt('wizard-job-qrcode'))
// console.log(camelizeOpt('wizard-job-env'))
// console.log(camelizeOpt('wizard-job-code'))
// console.log(camelizeOpt('wizard-job-code'))

// const myPromise = new Promise((resolve, reject) => {
//   resolve(2)
// })

// isPromise(myPromise)

// // const mySymbol = Symbol()
// // const symbolObj = {
// //   mySymbol: 'a' 
// // }
// console.log(isPrimitive(1))
// console.log(isPrimitive('1'))
// console.log(isPrimitive(false))
// console.log(isPrimitive({}))

// const tar = {
//   get() {
//     setTimeout(() => {
//       console.log(this)
//     }, 0)
//   }
// }


// const tar2 = {
//   get() {
//     setTimeout(function() {
//       console.log(this)
//     }, 0)
//   }
// }

// tar2.get()

