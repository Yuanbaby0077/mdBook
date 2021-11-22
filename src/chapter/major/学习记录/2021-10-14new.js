function User(name, age) {
  this.name = name
  this.age = age
  return {
    height: 20
  }
}

User.prototype.getName = function() {
  console.log('name=', this.name, ';age=', this.age)
  return this.name
}

function objectFactory() {
  const obj = Object.create({})
  const args = [...arguments]
  const Constructor = args.shift()
  obj.__proto__ = Constructor.prototype
  const res = Constructor.apply(obj, [...args])
  return Object.prototype.toString.call(res) === '[object Object]' ? res : obj
}

var u = objectFactory(User, 'zd', '30')
console.log(u)

// u.getName()

var a = new User('zs', 444)
console.log(a)
// a.getName() // a.getName is not a function
