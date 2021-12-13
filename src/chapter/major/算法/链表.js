class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
  }

  insert(item, ele) {
    const node = new Node(ele)
    if (this.head === null) {
      this.head = node
      return
    }
    // 查找插入节点的位置
    let cur = this.head
    let beforeNode = null
    while (cur) {
      if (cur.value === item) {
        beforeNode = cur
        break
      }
      cur = cur.next
    }

    // 更新节点next指针
    node.next = beforeNode.next
    beforeNode.next = node
    return this.head
  }
}

var l = new LinkedList()
l.insert(0, 1)
l.insert(1, 2)
l.insert(2, 3)
l.insert(3, 4)
l.insert(2, 5)
console.log(l.head)