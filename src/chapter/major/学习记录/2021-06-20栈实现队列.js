// 用栈来实现队列，实现队列的入队和出队操作

function Stack() {
  this.stackA = []
  this.stackB = []
}

Stack.prototype.enQueue = function(ele) {
  this.stackA.push(ele)
}

/**
 * 出队：现将stackA中的元素出栈到stackB中
 * 再从stackB中pop栈顶元素
 */
Stack.prototype.deQueue = function() {
  while (this.stackA.length > 0) {
    this.stackB.push(this.stackA.pop())
  }
  return this.stackB.pop()
}

const a = new Stack()
a.enQueue(3)
a.enQueue(2)
a.enQueue(1)
a.enQueue(4)
a.enQueue(9)

a.deQueue()
a.deQueue()
a.deQueue()
console.log(a.stackB, a.stackA)