// 传window的原因  
// 作用域链 外部变量作为参数传入，变成局部变量，提升代码效率
(function(window) {
  console.log(window)
})(global)

// 定义变量的权限问题 defineProperty
const val = 3
const obj = Object.create(null)
Object.defineProperty(obj, 'a', {
  get() {
    return val
  }
})


Object.defineProperty(Vue.prototype, '$router', {
  get () { return this._routerRoot._router }
})

Object.defineProperty(Vue.prototype, '$route', {
  get () { return this._routerRoot._route }
})


// 模块化

// node => commonjs
// 官方 => import
// 民间 => amd cmd umd
// 模块支持检测
if (typeof module === 'object' && typeof module.exports === 'object') {
  module.exports = 'jQuery'
} else {
  if (typeof define === 'function' && define.amd ) {
    define('jquery', [], function() {
      return jQuery
    })
  }
}

