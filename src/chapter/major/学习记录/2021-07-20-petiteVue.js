var a = {
  name: 'a',
  get greet(){
    return 'hello ' + this.name
  }
}

var receiver = {
  name: 'zs'
}

var res = Reflect.get(a, 'greet', receiver)

console.log(res)

let arr = [100,200,300]
let p = new Proxy(arr, {
  get(target, key) {
    console.log('get', key)
    return target[key]
  },
  set(target, key, value, receiver) {
    console.log('set value', key)
    target[key] = value
    return true
  }
})
arr.push(400)
console.log(arr[0])



 const evaluate = (scope, exp) =>
  execute(scope, `return(${exp})`)

const execute = (scope, exp) => {
  const fn = toFunction(exp) // new Function的实例对象
  try {
    console.log(scope, exp)
    return fn(scope) // 返回表达式的执行结果
  } catch (e) {
    console.error(e)
  }
}

const toFunction = (exp) => {
  try {
    return new Function(`$data`, `with($data){${exp}}`)
  } catch (e) {
    console.error(`${e.message} in expression: ${exp}`)
    return () => {}
  }
}

const scope = {
  a: 10,
  b: 20
}
const exp = scope.a > 0 && scope.b > 0
const res2 = evaluate(scope, exp)
console.log('res', res2)

