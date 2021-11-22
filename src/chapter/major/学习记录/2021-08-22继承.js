function Set() {
  this.values = {}
  this.n = 0
}
Set.prototype.add = function(i) {
  this.values[i] = i
  this.n++
}

function SubSet() {
  Set.apply(this, arguments)
}

SubSet.prototype = Object.create(Set.prototype)
SubSet.prototype.constructor = SubSet

SubSet.prototype.add = function() {
  for (let i = 0; i < arguments.length; i++) {
    if (!i) {
      throw TypeError('type error')
    }
  }
  Set.prototype.add.apply(this, arguments)
}

function AbstractSet() {
  if (this instanceof AbstractSet) {
    throw new Error('cannot instantiate abstract class')
  }
  
}

AbstractSet.prototype.contains = function() {

}
