// const promise1 = new Promise((resolve, reject) => {
//   reject()
// })

// const promise2 = promise1.then(
//   (res) => {
//     console.log(res)
//     return 2
//   },
//   () => {
//     return {
//       get then() {
//         throw new Error()
//       }
//     }
//   }
// )

// promise2.then(
//   () => {
//     console.log(promise2)
//     console.log('finish')
//   },
//   (res) => {
//     console.log('reject')
//   }
// )


// new Promise((resolve, reject) => {
//   reject(2)
// })
// .then((res) => {
//   console.log(res)
// })
// .catch((e) => {
//   console.log(e)
// })


const promiseA = new Promise((resolve, reject) => {
  console.log(Date.now())
  setTimeout(() => {
    console.log(Date.now())
    resolve(333)
  }, 2000)
  // resolve(2)
  // throw new Error('3333')
});

Promise.resolve(2).then((res) => {
  console.log('basic type', res)
})

Promise.resolve(new Promise(resolve => resolve(2))).then((res) => {
  console.log('thenable', res)
})

const promiseB = promiseA.then((res) => {
  console.log('b', res)
});
const promiseC = promiseA.then((res) => {
  console.log('c', res)
}); 

const promiseD = promiseA.catch((res) => {
  console.log('d', res)
});
const promiseE = promiseA.catch((res) => {
  console.log('e', res)
}); 


Promise.reject()
  .then(() => 99, () => 42) // onRejected returns 42 which is wrapped in a resolving Promise
  .then(solution => console.log('Resolved with ' + solution)); // Resolved with 42

Promise.resolve()
  .then(() => {
    // 使 .then() 返回一个 rejected promise
    throw new Error('Oh no!');
  })
  .catch(error => {
    console.error('onRejected function called: ' + error.message);
  })
  .then(() => {
    console.log("I am always called even if the prior then's promise rejects");
  });
  
  var p1 = Promise.resolve('foo');
  var p2 = p1.then(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(10)
      }, 1000)
    })
  })

  p2.then(function(v) {
    console.log('resolved', v);  // resolved 10
  }, function(e) {
    console.error('rejected', e);
  });
  
  var p3 = p1.then(function() {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        reject(new Error('Error'));
      }, 1000)
    });
  });
  p3.then(function(v) {
    console.log('resolved', v);
  }, function(e) {
    console.error('rejected', e); // rejected error
  });