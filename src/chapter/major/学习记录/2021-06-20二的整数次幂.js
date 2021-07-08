// 判断一个正整数是否是2的整数次幂，是返回true，不是返回false，要求性能尽可能高
var count = 0

function isPowerOf2(tar) {
  let res = 1
  while (res < tar) {
    res = res << 1
    count++
    if (res === tar) return true
  }
  return false
}

console.log(isPowerOf2(1024), count)

// 该算法的时间复杂度为 logn log1024 = 10

function isPowerOfByBinary(tar) {
  return (tar & (tar - 1)) === 0
}

console.log(isPowerOfByBinary(1024))
console.log(isPowerOfByBinary(1023))
console.log(isPowerOfByBinary(8192))
