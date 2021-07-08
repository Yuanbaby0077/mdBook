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

BinaryTree.prototype.insert = function(key) {
  const newNode = new TreeNode(key)
  if (this.root === null) {
    this.root = newNode
    return
  }
  
  let curNode = this.root
  while(curNode !== null) {
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

BinaryTree.prototype.getRoot = function(key) {
  return this.root
}

const binaryTree = new BinaryTree()
binaryTree.insert(6)
binaryTree.insert(2)
binaryTree.insert(4)
binaryTree.insert(15)
binaryTree.insert(3)
binaryTree.insert(5)
binaryTree.insert(7)
binaryTree.insert(16)
console.log(binaryTree.getRoot())

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