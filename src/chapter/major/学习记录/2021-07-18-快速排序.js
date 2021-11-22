function quickSort(arr, start, end) {
  if (start >= end) return arr 
  const pivot = getPivot(arr, start, end)
  quickSort(arr, start, pivot - 1)
  quickSort(arr, pivot + 1, end)
  console.log(arr)
}

// 双指针
function getPivot(arr, start, end) {
  // 每次参照物为第一个元素
  let left = start
  let pivot = arr[left]
  let right = end
  // 从左边依次查找
  while (left < right) {
    // 从右边依次找数据
    while(left < right && arr[right] > pivot) {
      right--
    }
    while(left < right && arr[left] <= pivot) {
      left++
    }
    
    if (left < right) {
      swap(arr, left, right)
    }
  }
  swap(arr, left, start)
  return left
}

function swap(arr, i, j) {
  const temp = arr[i] 
  arr[i] = arr[j]
    arr[j] = temp
    return arr
}

quickSort([3,2,7,6,5,9,1,8], 0, 7)
quickSort([31,12,17,16,51,91,11,81], 0, 7)
