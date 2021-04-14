Promise.resolve()
  .then(() => {
    console.log(0)
    return Promise.resolve(1)
  })
  .then((res) => {
    console.log(res)
    return new Promise((resolve, reject) => resolve(2))
  })
  .then(res=> {
    console.log(res)
    return res // 返回一个Number类型
  })
  // .catch(res=> {
  //   console.log('4', res) // 作为参数来执行promise
  // })

Promise.resolve()
  .then(() => {
    console.log(3)
  })
  .then(() => {
    console.log(4)
  })
  .then(() => {
    console.log(5)
  })
  .then(() => {
    console.log(6)
  })
  .then(() => {
    console.log(7)
  })


// const promise2 = Promise.resolve(444).then(() => {
//   return 2
// })

// const promise3 = new Promise((resolve, reject) => {
//   resolve(3444)
//   resolve(4555)
// })
// console.log(promise2)
// const promise4 = promise3.then(2, reject => {

// })
// promise4.then((res) => {
//   console.log('promise3', res)
// }).catch((e) => {
//   console.log(e)
// })


// console.log('stack [1]');
// setTimeout(() => console.log("macro [2]"), 0);
// setTimeout(() => console.log("macro [3]"), 1);

// const p = Promise.resolve();
// for(let i = 0; i < 3; i++) p.then(() => {
//     setTimeout(() => {
//         console.log('stack [4]')
//         setTimeout(() => console.log("macro [5]"), 0);
//         p.then(() => console.log('micro [6]'));
//     }, 0);
//     console.log("stack [7]");
// });

Promise.resolve(2) // resolve(2) 函数返回一个Promise<number>对象
.then(x=>{
   console.log( x ); // 输出2， 表示x类型为number且值为2，也就是上面resolve参数值
   return "hello world"; // 回调函数返回字符串类型，then函数返回Promise<string>
}) // then函数返回Promise<string>类型
.then(x=>{
   console.log( x ); // 输出hello world，也就是上一个then回调函数返回值，表明上一个then的返回值就是下一个then的参数
}) // then函数回调函数中没有返回值，则为Promise<void>
.then(x=>{ // 前面的then的回调函数没有返回值所以这个x是undefined
   console.log( x ); // undefined
}) // Promise<void>
.then(()=>{ // 前面没有返回值，这里回调函数可以不加返回值
   return Promise.resolve("hello world"); // 返回一个Promise<string>类型
}) // 这里then的返回值是Promise<string>
.then(x=>{ // 虽然上面的then中回调函数返回的是Promise<string>类型但是这里x并不是Promise<string>类型而是string类型
   console.log(x); // hello world
   return Promise.resolve(2); // 返回一个Promise<number>类型对象
})