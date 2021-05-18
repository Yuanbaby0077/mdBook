var fs = require('fs')

// var res = fs.openSync('./demo1.js', 'w')
// console.log(res)

// fs.writeSync(res, '同步方式写入文件')
// fs.closeSync(res)

// 同步方式的问题： 要等数据读完/写完才能往下执行
// 使用异步方式，不用等文件处理结束再往下执行

fs.open('./demo1.js', 'w', (err, fd) => {
  if (err) throw new Error(err)
  console.log(err) // null
  console.log(fd) // 20

  fs.write(fd, '异步添加文件内容', (err, written, string) => {
    if (err) throw new Error(err)
    console.log(written, string)

    fs.close(fd, (err) => {
      if (err) throw new Error(err)
      console.log('close success')
    })
  })
})

console.log('执行中=======')

// 异步操作的缺点是：回调嵌套，代码可读性差
// 优点： 性能比同步方式优