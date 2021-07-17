// https://www.youtube.com/watch?v=RFEqcXSo_Zg&t=203s 单源最短路径
// https://www.youtube.com/watch?v=rmgoivyt4Ew 回溯算法
// https://www.youtube.com/watch?v=UtX1BPPjojc
// 动态创建二叉查找树
// 根节点的左子树比根节点小，右子树比根节点大

function TreeNode(key) {
  this.key = key
  this.left = null
  this.right = null
}

function BinaryTree() {
  this.root = null
}

BinaryTree.prototype.insert = function (key) {
  const newNode = new TreeNode(key)
  if (this.root === null) {
    this.root = newNode
    return
  }

  let curNode = this.root
  while (curNode !== null) {
    // 插入的节点值大于根节点值，往右
    if (key > curNode.key) {
      if (curNode.right === null) {
        curNode.right = newNode
        return
      } else {
        curNode = curNode.right
      }
    } else if (key <= curNode.key) {
      // 插入的节点值小于根节点值，往左
      if (curNode.left === null) {
        curNode.left = newNode
        return
      } else {
        curNode = curNode.left
      }
    }
  }
}

BinaryTree.prototype.get = function (key) {
  let node = this.root
  while (node && node.key !== key) {
    if (key < node.key) {// 左子树查找
      node = node.left
    } else if (key > node.key) {
      node = node.right
    }
  }
  return node
}

/**
 * 1、查找要删除的节点（记录父节点）
 * 2、
 * @param {*} key 
 * @returns 
 */
BinaryTree.prototype.deleteNode = function (key) {
  if (this.root === null) return false
  let node = this.root
  let parent = null
  let isLeftChild = false
  while (node !== null && node.key !== key) {
    parent = node
    if (key < node.key) {
      isLeftChild = true
      node = node.left
    } else if (key > node.key) {
      isLeftChild = false
      node = node.right
    }
  }
  // 没有找到要删除的节点
  if (!node) return false
  // 叶子节点
  // 左节点和右节点均为null
  if (node.left === null && node.right === null) {
    // 如果是根节点
    if (node === this.root) {
      this.root = null
    } else if (isLeftChild) { // 如果是左节点
      parent.left = null
    } else {
      parent.right = null // 如果是右节点
    }
  }

  if (node.left === null) { // 如果删除的节点的左孩子为空
    if (node === this.root) {
      this.root = node.right
    } else if (isLeftChild) {
      parent.left = node.right
    } else {
      parent.right = node.right
    }
  } else if (node.right === null) { // 删除的节点的右孩子节点为空
    if (this.root === node) {
      this.root = node.left
    } else if (isLeftChild) {
      parent.left = node.left
    } else {
      parent.right = node.left
    }
  } else { // 删除的节点左右孩子节点都不为空，替换节点为右孩子中最小的
    let minNode = null
    let minNodeParent = null
    let curNode = node.right
    while (curNode) {
      minNodeParent = minNode
      minNode = curNode
      curNode = curNode.left
    }

    if (minNode.right) { // 最小的节点有右子节点
      minNodeParent.left = minNode.right
    } else {
      minNodeParent.left = null
    }
    minNode.right = minNodeParent

    if (this.root === node) {
      this.root = minNode
    } else if (isLeftChild) {
      parent.left = minNode
    } else {
      parent.right = minNode
    }
    minNode.left = node.left
  }
  return true
}

BinaryTree.prototype.getRoot = function (key) {
  return this.root
}


/**
 * 前序遍历 先遍历根节点，再遍历左子树，最后遍历右子树
 * @returns 
 */
BinaryTree.prototype.preOrderNodeByRecursive = function () {
  const res = []
  const node = this.root
  const preOrder = (node) => {
    if (node === null) return
    res.push(node.key)
    node.left && preOrder(node.left)
    node.right && preOrder(node.right)
  }
  preOrder(node)
  return res
}
BinaryTree.prototype.preOrderTraverseNode = function () {
  const stack = []
  const res = []
  if (this.root) {
    stack.push(this.root)
  }

  while (stack.length > 0) {
    let curNode = stack.pop()
    res.push(curNode.key)

    if (curNode.right !== null) {
      stack.push(curNode.right)
    }
    if (curNode.left !== null) {
      stack.push(curNode.left)
    }
  }
  return res
}

BinaryTree.prototype.middleOrderNodeByRecursive = function () {
  const res = []
  const fn = (node) => {
    node.left && fn(node.left)
    res.push(node.key)
    node.right && fn(node.right)
  }
  fn(this.root)
  return res
}

BinaryTree.prototype.middleOrderNode = function () {
  const res = []
  let node = this.root
  const stack = []
  while (stack.length || node) {
    while (node) {
      stack.push(node)
      node = node.left
    }
    if (stack.length) {
      node = stack.pop()
      res.push(node.key)
      node = node.right
    }
  }
  return res
}

/**
 * 后序遍历
 * @returns 
 */
BinaryTree.prototype.endOrderNodeByRecursive = function () {
  let node = this.root
  const res = []
  const fn = (node) => {
    if (node === null) return
    node.left && fn(node.left)
    node.right && fn(node.right)
    res.push(node.key)
  }
  fn(node)
  return res
}

BinaryTree.prototype.endOrderNodeByStack = function () {
  let node = this.root
  const res = []
  const visited = {}
  const stack = [node]
  while (stack.length) {
    while (node.left && !visited[node.key]) {
      visited[node.key] = true
      node = node.left
      stack.push(node)
    }

    if (node.right && !visited[node.right.key]) {
      node = node.right
      stack.push(node)
    } else {
      const popNode = stack.pop()
      res.push(popNode.key)
      visited[popNode.key] = true
      node = stack[stack.length - 1]
    }
  }
  return res
}

/**
 * 优化
 * 后序遍历的顺序是按照左右根 可以使用前序的方式逆向处理 根右左
 * 前序遍历的顺序是按照根左右
 * @returns 
 */
BinaryTree.prototype.endOrderNodeByStackOpt = function () {
  let node = this.root
  const res = []
  const stack = [node]
  while(stack.length) {
    node = stack.pop()
    res.unshift(node.key)

    if (node.left) {
      stack.push(node.left)
    }

    if (node.right) {
      stack.push(node.right)
    }
  }
  return res
}

/**
 * 层序遍历：使用队列 先进先出
 * @returns 
 */
BinaryTree.prototype.LayerOrderNodeByStack = function () {
  if (!this.root) return
  let node = this.root
  const queue = [node]
  const res = []
  while (queue.length) {
    let shiftNode = queue.shift()
    res.push(shiftNode.key)
    
    if (shiftNode.left) {
      queue.push(shiftNode.left)
    }
    if (shiftNode.right) {
      queue.push(shiftNode.right)
    }
  }
  
  return res
}

const binaryTree = new BinaryTree()
binaryTree.insert(6)
binaryTree.insert(2)
binaryTree.insert(1)
binaryTree.insert(4)
binaryTree.insert(15)
binaryTree.insert(3)
binaryTree.insert(5)
binaryTree.insert(7)
binaryTree.insert(9)
binaryTree.insert(16)
binaryTree.insert(18)
// console.log(binaryTree.deleteNode(6), binaryTree.getRoot())
console.log('栈', binaryTree.preOrderTraverseNode())
console.log('递归', binaryTree.preOrderNodeByRecursive())
console.log('中序遍历', binaryTree.middleOrderNodeByRecursive())
console.log('后序遍历', binaryTree.endOrderNodeByRecursive())
console.log('后序遍历栈', binaryTree.endOrderNodeByStack())
console.log('层序遍历', binaryTree.LayerOrderNodeByStack())

function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
/**
 * 构建堆，从最后一个子节点的父节点开始进行heapify
 * @param {*} arr 
 * @param {*} n 
 */
function buildHeap(arr, n) {
  const lastNodeIdx = n - 1
  const parentIndex = (lastNodeIdx - 1) >> 1
  for (let i = parentIndex; i >= 0; i--) {
    heapify(arr, n, i)
  }
  return arr
}
function heapify(arr, n, i) {
  if (i >= n) return
  let max = i
  let c1 = 2 * i + 1 // 左子树下标
  let c2 = 2 * i + 2 // 右子树下标

  if (c1 < n && arr[c1] > arr[max]) {
    max = c1
  }
  if (c2 < n && arr[c2] > arr[max]) {

    max = c2
  }
  // 交换节点值
  if (max !== i) {
    swap(arr, max, i)
    heapify(arr, n, max)
  }
  return arr
}

function heapSort(arr) {
  const n = arr.length
  buildHeap(arr, n) // 构建堆
  for (let i = n - 1; i >= 0; i--) {
    // 交换第一个和最后一个的位置
    swap(arr, 0, i)
    console.log('交换结果', arr)
    heapify(arr, i, 0) // 每次只需要heapify [0,i)的堆即可
  }
  return arr
}

const arr = [4, 10, 3, 6, 5, 8, 2]
const res = heapSort(arr, 6)
console.log(res)