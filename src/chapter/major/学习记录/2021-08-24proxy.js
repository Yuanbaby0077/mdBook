var obj = new Proxy({}, {
  get(target, propKey, receiver) {
    console.log('get')
    return Reflect.get(target, propKey, receiver)
  },
  set(target, propKey, receiver) {
    console.log('set')
    return Reflect.set(target, propKey, receiver)
  }
})

obj.count = 1 // set
obj.count // get

obj.user = {
  name: 'zs',
  hobby: ['ball']
}

var source = {
  name: 'ls'
}
var proxyObj = new Proxy(source, {})

proxyObj.age = 23 // {name: "ls", age: 233}


// proxy对象作为其他对象的原型

var proxyObj2 = Object.create(obj)

proxyObj2.count // get

// proxyObj2上本身没有count属性，会往原型链上找，在obj对象上找到count属性，进行拦截
export default proxyObj2