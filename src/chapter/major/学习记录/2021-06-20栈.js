// 实现一个栈，该栈带有出栈，入栈，取最小元素三个方法，
// 保证三个方法的时间复杂度为o(1)

function Stack() {
  
  this.stackA = []
  this.stackB = [] // 备用栈 存储最小值
}

/**
   * 当ele小于备用栈中的栈顶元素，则入栈
   * @param {*} ele 
   */
Stack.prototype.push = function(ele) {
  this.stackA.push(ele)
  if (this.stackB.length === 0 || ele <= this.stackB[this.stackB.length - 1]) {
    this.stackB.push(ele)
  }
}

/**
 * 当出栈元素等于备用栈的栈顶元素，则备用栈也出栈
 */
Stack.prototype.pop = function() {
  if (this.stackA[this.stackA.length - 1] === this.stackB[this.stackB.length - 1]) {
    this.stackB.pop()
  }
  this.stackA.pop()
}

/**
 * 最小值即备用栈的栈顶元素
 * @returns 
 */
Stack.prototype.getMin = function() {
  return this.stackB[this.stackB.length - 1]
}

const stackA = new Stack()
stackA.push(4)
stackA.push(9)
stackA.push(5)
stackA.push(7)
stackA.push(3)
stackA.push(4)

console.log(stackA.stackA, stackA.stackB, stackA.getMin())


stackA.pop()
stackA.pop()
stackA.pop()

console.log(stackA.stackA, stackA.stackB, stackA.getMin())
