// 求两个数的最大公约数

function maxVal(a, b) {
  return a > b ? a : b
}

function minVal(a, b) {
  return a < b ? a : b
}
// 1、暴力解法

function getMaxDivisorByViolent(a, b) {
  let min = minVal(a, b)
  let max = maxVal(a, b)
  if (max % min === 0) return min
  for (let i = min / 2; i > 1; i--) {
    if (min % i === 0 && max % i === 0) {
      return i
    }
  }
  return 1
}

// console.log(getMaxDivisorByViolent(12, 24))
// console.log(getMaxDivisorByViolent(33, 34))
// console.log(getMaxDivisorByViolent(35, 5))
// console.log(getMaxDivisorByViolent(48, 50))
let count = 0
/**
 * 欧几里得算法：辗转相除：两个正整数a和b(a > b)，它们的最大公约数是a除以b的余数c和b之间的最大公约数
 * @param {*} a 
 * @param {*} b 
 */
function getMaxDivisorByDivided(a, b) {
  count++
  let min = minVal(a, b)
  let max = maxVal(a, b)
  if (max % min === 0) return min
  return getMaxDivisorByDivided(max % min, min)
}

// console.log(getMaxDivisorByDivided(25, 35))
// console.log(getMaxDivisorByDivided(40, 90))
// console.log(getMaxDivisorByDivided(23, 34))
// console.log(getMaxDivisorByDivided(34, 51))
console.log(getMaxDivisorByDivided(10000, 35), count)
/**
 * （九章算术）更相减损法：两个正整数a和b（a > b）,它们的最大公约数是a-b的差值c和b之间的最大公约数
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
function getMaxDivisorByMinus(a, b) {
  count ++
  let min = minVal(a, b)
  let max = maxVal(a, b)
  if (max % min === 0) return min
  return getMaxDivisorByMinus(max - min, min)
}

// console.log(getMaxDivisorByMinus(28, 35))
// console.log(getMaxDivisorByMinus(63, 72))
// console.log(getMaxDivisorByMinus(23, 34))
// console.log(getMaxDivisorByMinus(34, 51))
// console.log(getMaxDivisorByMinus(10000, 35), count)

// 辗转相除弊端是数值大的时候取模消耗性能
// 更相减损弊端是运算次数不稳定，比如10000, 35的最大公约数，运算次数为289次，而使用辗转相除只要4次
// 终极优化：结合辗转相除和更相减损的优势，既可以避免大整数取模，又能减少运算次数,10000, 35的最大公约数的运算次数为15次 

// a, b都是偶数(a & 1 = 0, b & 1 = 0)，a >> 1, b >> 1
// a, b都是奇数(a > b)(a & 1 != 0, b & 1 != 0)，a - b的差值c必定是偶数
// a是偶数（a & 1 = 0），b是奇数(b & 1 != 0) (a>>1, b)
// b是偶数（b & 1 = 0），a是奇数(a & 1 != 0) (a, b>>1)
function getMaxDivisorByMove(a, b) {
  let min = minVal(a, b)
  let max = maxVal(a, b)
  count ++
  if (max % min === 0) return min
  if ((max & 1) === 0 && (min & 1) === 0) {
    return getMaxDivisorByMove(max >> 1, min >> 1) << 1
  } else if((max & 1)=== 0 && (min & 1) !== 0) {
    return getMaxDivisorByMove(max >> 1, min)
  } else if ((max & 1) !== 0 && (min & 1) === 0) {
    return getMaxDivisorByMove(max, min >> 1)
  } else {
    return getMaxDivisorByMove(max - min, min)
  }
}

// console.log(getMaxDivisorByMove(25, 36))
// console.log(getMaxDivisorByMove(25, 35))
// console.log(getMaxDivisorByMove(10000, 35), count)
