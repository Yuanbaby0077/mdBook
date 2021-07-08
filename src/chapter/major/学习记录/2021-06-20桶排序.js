function bucketSort(arr) {
  if (arr.length === 0) return []
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
  const d = maxVal - minVal
  const bucketNum = arr.length
  
  // 初始化桶
  const bucketList = []
  for (let i = 0; i< bucketNum; i++) {
    bucketList[i] = []
  }

  // 跨度
  const kd = (maxVal - minVal) / (bucketNum - 1)
  for (let i = 0; i< arr.length; i++) {
    // 区间
    const val = arr[i]
    const num = Math.round((arr[i] - minVal) / kd) 
    bucketList[num].push(val)
  }
}

console.log(bucketSort([0.84,0.5, 2.2, 4.5, 8, 3.2, 5,7.99]))