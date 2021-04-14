var scope = 'global'

function fn() {
  var scope = 'local'
  return scope
}

console.log(fn()) // local

_scope = 'global'
function checkScope() {
  _scope = 'local'
  myScope = 'local'
  return [_scope, myScope]
}

console.log(checkScope()) // [ 'local', 'local' ]
console.log(global._scope, global.myScope) // local local

var __scope = 'global Scope'
function fnScope() {
  console.log(__scope) // undefined
  var __scope = 'function scope'
  console.log(__scope) // function scope
}
fnScope()

var ___scope = 'scope chain'
function chaninScope() {
  var ___scope = 'inner chain'
  function innerScope() {
    return ___scope
  }
  return innerScope()
}

console.log(chaninScope()) // inner chain

function chaninScope2() {
  var ____scope = 'inner chain'
  function innerScope() {
    return ____scope
  }
  return innerScope
}

console.log(chaninScope2()()) // inner chain


function beforeDeclare() {
  console.log('beforeDeclare', scope)
  var scope = 'kkk'
  return function() {
    var scope = 'scope'
    return scope
  }
}

beforeDeclare()()


function bibao() {
  var counter = 0
  return {
    count() {
      return counter ++
    },
    reset() {
      counter = 0
    }
  }
}

var b1 = bibao()

console.log(b1.count())
console.log(b1.count())
b1.reset()
console.log(b1.count())


function constfunc(v) {
  return () => v
}

var funcs = []
for(var i=0; i< 10; i++) {
  funcs[i] = constfunc(i)
}

console.log(funcs[5]()) // 5

function constfunc2() {
  var funcs = []
  console.log('i = ', i)
  for(let i=0; i< 10; i++) {
    funcs[i] = () => i
  }
  return funcs
}

console.log(constfunc2()[5]()) // 10

