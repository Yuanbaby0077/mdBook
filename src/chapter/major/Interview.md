# 面试题

## 工作中解决过的比较困难的问题，项目中的亮点是什么

工作笔记

## 浏览器的事件循环

### 为什么js在浏览器中有事件循环的机制

因为js是单线程的

### 宏任务&微任务

宏任务：整体代码、setTimeout、setInternal、I/O操作

微任务：new Promise().then、nextTick()、MutaionObserver(前端的回溯)

### 只有宏任务可以吗

宏任务是先进先出的原则执行

### node中的事件循环和浏览器的区别

* timers定时器： 执行setTimeout和setInternal的回调函数
* pending callback 
* idle prepare
* poll
* check 
* close callback

微任务和宏任务在node 中的执行顺序：

Node v10及以前
1、执行完一个阶段中的所有任务
2、执行nextTick队列中的内容
3、执行完微任务队列的内容

Node v10以后：和浏览器统一

[微任务](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide)





