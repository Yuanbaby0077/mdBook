function countSort(arr = []) {
  if (arr.length === 0) return []
  const countArr = []
  let maxVal = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxVal) {
      maxVal = arr[i]
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (countArr[arr[i]] === undefined) {
      countArr[arr[i]] = 0
    }
    countArr[arr[i]] += 1
  }
  console.log('countArr',countArr)

  const sortedArr = []
  for (let i = 0; i < countArr.length; i++) {
    let val = countArr[i]
    while(val > 0) {
      sortedArr.push(i)
      val --
    }
  }
  return sortedArr
}

// console.log('res', countSort([1,4,2,9,1,3,5,7,3,2,1,10]))

// 弊端：构造了一个从[0, maxVal]长度的数组，容易造成空间浪费

function optimizeCountSort(arr = []) {
  if (arr.length === 0) return []
  const countArr = []
  let maxVal = arr[0]
  let minVal = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxVal) {
      maxVal = arr[i]
    }
    if (arr[i] < minVal) {
      minVal = arr[i]
    }
  }

  console.log(minVal, maxVal)
  // 统计输入的arr元素
  for (let i = 0; i < arr.length; i++) {
    const countIndex = arr[i] - minVal 
    if (countArr[countIndex] === undefined) {
      countArr[countIndex] = 0
    }
    countArr[countIndex] += 1
  }
  console.log('countArr',countArr)

  const sortedArr = []
  for (let i = 0; i < countArr.length; i++) {
    let val = countArr[i]
    while(val > 0) {
      sortedArr.push(i + minVal)
      val --
    }
  }
  return sortedArr
}

// console.log(optimizeCountSort([89, 80, 98, 100, 99, 83, 95, 80, 89, 93]))

// 弊端：不是稳定排序

// 最终优化
function optimizeCountSort2(arr = []) {
  if (arr.length === 0) return []
  const countArr = []
  let maxVal = arr[0]
  let minVal = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxVal) {
      maxVal = arr[i]
    }
    if (arr[i] < minVal) {
      minVal = arr[i]
    }
  }

  console.log(minVal, maxVal)

  // 统计输入的arr元素
  for (let i = 0; i < arr.length; i++) {
    const countIndex = arr[i] - minVal 
    if (countArr[countIndex] === undefined) {
      countArr[countIndex] = 0
    }
    countArr[countIndex] += 1
  }

  // countArr 变形：得到每个元素最终排序的位置
  for (let i = 1; i < countArr.length; i++) {
    if (countArr[i -1] === undefined) {
      countArr[i - 1] = 0
    }
    if (countArr[i] === undefined) {
      countArr[i] = 0
    }
    countArr[i] += countArr[i - 1]
  }

  console.log('countArr',countArr)

  const sortedArr = []
  for (let i = arr.length - 1; i >= 0 ; i--) {
    let val = arr[i] // 原数组第i项的值
    const index = val - minVal // 当前元素在countArr中的坐标
    const countVal = countArr[index] // 坐标值
    sortedArr[countVal - 1] = val
    countArr[index] -= 1
  }
  return sortedArr
}

console.log(optimizeCountSort2([99, 90, 95, 94, 95]))


// 计数排序的局限性
// 1、 输入序列的[min, max]差值过大，不适用
// 2、当元素不是整数时，无法创建统计数组，不适用

// 计数排序的局限性 由桶排序进行了弥补，时间复杂度也是线性的