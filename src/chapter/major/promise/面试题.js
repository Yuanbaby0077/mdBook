// 该题定义了一个同步函数对传入的数组进行遍历乘二操作
// 同时每执行一次就会给 executeCount 累加。

let executeCount = 0
const fn = nums => {
  executeCount++
  console.log('executeCount', executeCount)
  return nums.map(x => x * 2)
}

// 最终我们需要实现一个 batcher 函数，
// 使用其对该同步函数包装后, 
// 实现每次调用依旧返回预期的二倍结果，
// 同时还需要保证 executeCount 执行次数为1。
const batcher1 = f => {
  return nums => {
    try {
      return f(nums)
    } finally {
      executeCount = 1
    }
  }
}

const batcher2 = f => {
  let nums = []
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(f(nums))
    }, 0)
  })
  return arr => {
    const start = nums.length
    nums = nums.concat(arr)
    const end = nums.length
    return promise.then(res => {
      return res.slice(start, end)
    })
  }
}

const batcher = f => {
  let nums = []
  const promise = Promise.resolve().then(() => f(nums))
  return arr => {
    const start = nums.length
    nums = nums.concat(arr)
    const end = nums.length
    return promise.then(res => {
      return res.slice(start, end)
    })
  }
}

const batchedFn = batcher(fn);

const main = async () => {
  const [r1, r2, r3] = await Promise.all([
    batchedFn([1,2,3]),
    batchedFn([4,5]),
    batchedFn([7,8,9])
  ]);
  console.log(r1)
  console.log(r2)
  console.log(r3)
}

main()

// 考点：事件循环: 微任务/宏任务 必包/作用域链