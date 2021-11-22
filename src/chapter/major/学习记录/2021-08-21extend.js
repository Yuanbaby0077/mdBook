// 继承
function extend(o, p) {
  for (const i in p) {
    o[i] = p[i]
  }
  return o
}

function inherit(p) {
  return Object.create(p)
}
function defineClass(constructor, methods, statics) {
  if (methods) {
    extend(constructor.prototype, methods)
  }
  if (statics) {
    extend(constructor, statics)
  }
  return constructor
}

function defineSubClass(superClass, constructor, methods, statics) {
  constructor.prototype =  inherit(superClass.prototype)
  constructor.prototype.constructor = constructor
  if (methods) {
    extend(constructor.prototype, methods)
  }
  return constructor
}

function User() {
  this.name = 'zs'
}
User.prototype.getName = function() {
  return this.name
}

function SubUser() {
  this.name = 'ls'
}

var _ctor = defineSubClass(User, SubUser, User.prototype)
console.log(_ctor, _ctor.prototype.constructor)

var a = new _ctor
console.log(a.__proto__, a instanceof SubUser, a.getName())

