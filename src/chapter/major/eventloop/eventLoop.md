# 浏览器事件循环

## 为什么会有事件循环机制

单线程

## 宏任务 微任务

宏任务：整体代码、setTimeout、setInternal、I/O
微任务： Promise、mutaionObserver

### queneMicrotask

语法：
```
  scope.queueMicrotask(function);
```

参数：
* function：当浏览器引擎认为足够安全的时候会去调用这个回调函数。微任务被执行是在pending的任务已经结束，但是在下一次事件循环之前
A function to be executed when the browser engine determines it is safe to call your code. Enqueued microtasks are executed after all pending tasks have completed but before yielding control to the browser's event loop.


### 猴子补丁（monkey-patch）

使用promise 来创建queneMicrotask
```
if (typeof window.queueMicrotask !== "function") {
  window.queueMicrotask = function (callback) {
    Promise.resolve()
      .then(callback)
      .catch(e => setTimeout(() => { throw e; })); // report exceptions
  };
}
```