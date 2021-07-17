// 例一
// 1、三种硬币，面值2、5、7元，每种硬币都足够多
// 2、现在要买一本书27块钱
// 3、如何用最少的硬币组合正好付清，不需要对方找钱

// fn(n) = min(fn(n - 2) + 1, fn(n - 5) + 1, fn(n - 7) + 1)

let  i = 0
function fn(n) {
  console.log(i++)
  if (n < 0) return Infinity
  if (n === 0) return 0
  return Math.min(fn(n - 2) + 1, fn(n - 5) + 1, fn(n - 7) + 1)
}

// console.log(fn(27)) // 运算次数 3783

function _fn(n) {
  console.log(i++)
  let res = Infinity // 初始值为无穷大
  if (n === 0) return 0
  if (n >= 2) {
    res = Math.min(fn(n - 2) + 1, res)
  }
  if (n >= 5) {
    res = Math.min(fn(n - 5) + 1, res)
  }
  if (n >= 7) {
    res = Math.min(fn(n - 7) + 1, res)
  }
  return res
}

// console.log(_fn(27))

// 使用数组处理，从小到大，

function dyCoinByArray(n, coins) {
  const arr = []
  arr[0] = 0
  for (let i = 1; i <= n; i++) {
    arr[i] = Infinity
    for (let j = 0; j < coins.length; j++) {
      if (i - coins[j] < 0) {
        arr[i - coins[j]] = Infinity
      }
      arr[i] = Math.min(arr[i - coins[j]] + 1, arr[i])
    }
  }
  console.log(arr)
  return arr[n]
}

// console.log(dyCoinByArray(30, [2, 5, 7]))

// m行n列的网格，小人从左上角[0, 0]出行，每次可以向下或者向右走一步，
// 问有几种不同的方式到右下角[m, n]的位置
// 状态 设grid[m][n]为小人有多少中方式可以到达右下角
// 转移方程grid[m][n] = grid[m-1][n] + grid[m][n - 1]

function dyForGrid(m, n) {
  if (m <= 1) return 1
  if (n <= 1) return 1
  const grid = []
  for (let i = 0; i < m; i++) {
    grid[i] = []
    for (let j = 0; j < n; j++) {
      grid[i][j] = 0
      if (i === 0 || j === 0) {
        grid[i][j] = 1
      } else {
        grid[i][j] = grid[i][j - 1] + grid[i - 1][j]
      }
    }
  }
  return grid[m-1][n-1]
}
console.log(dyForGrid(4, 4))

// n 块石头在x轴上的0,1,...n - 1的位置
// 一只青蛙在石头0，想跳到n - 1
// 如果青蛙在第i块石头上，最多可以向右跳ai
// 问青蛙能否跳到n - 1

// 存在型动态规划

function dyForFrog(arr) {
  let res = []
  res[0] = true
  for (let n = 1; n < arr.length; n++) {
    res[n] = false
    for (let i = 0; i < n; i++) {
      if (res[i] && arr[i] + i >= n) {
        res[n] = true
        break
      }
    }
  }
  console.log(res)
  return res[arr.length - 1]
}

console.log(dyForFrog([3,2,1,3,4,6,7]))