# Debounce/Throttle/Immdiate

## 基本概念

现代浏览器中，帧速率60fps是性能优化的目标。如果每秒发生n个事件并且回调执行，需要t秒的事件，那么每个事件在流畅运行的情况下需要的时间是 `1 / n >= t`
t 为毫秒，则需要时间是` 1000 / n >= t`

例如，window的`mousemove`和`resize`事件，一秒可以可以超过60次，如果回调里面包含DOM的重绘重排操作，就很容易超过16.67ms，那么就会出现性能问题。

### 实现原理

Throttle 的实现原理就是定时器，触发事件时，至少要等设置的时间间隔之后才能再次触发事件，如果在时间间隔内触发，则清掉定时器，再设置一个新的定时器。
```

function throttle(method, context) {
     clearTimeout(method.tId);
     method.tId = setTimeout(function(){
         method.call(context);
     }, 100);
 }
 const throttleFn = function() {
  console.log('resize')
}
window.onresize = function() {
  throttle(throttleFn)
}
```

```
var throttle = function(fn, delay){
 	var timer = null
 	return function(){
 		var context = this, args = arguments
 		clearTimeout(timer);
 		timer = setTimeout(function(){
 			fn.apply(context, args);
 		}, delay);
 	};
 };
 
 function handleResize() {
   console.log('resize')
 }
 window.onresize = throttle(handleResize, 100)

```
  * Debounce

举个例子：

输入框输入文本，当按键被按下时，发生`keydown`事件，长按一个键，就持续触发该事件，而松开按键，则触发`keyup`事件。此时，内容输入也是有效的。相当于`keydown`是原始输入，`keyup`是去抖动输入。

实现：
debounce即防止抖动，当持续触发事件时，debounce会合并事件并且不会去激活回调，等待一定时间检查相同的事件是否再次触发，如果是，则重置定时器，并再次等待设置的时间。如果没有触发相同的事件，才会去激活回调。

```
var delta = 1000
var timeoutID = null
 
function log() {
  console.log('foo')
}
 
function debounceLog() {
  clearTimeout(timeoutID)
  console.log('=====', timeoutID)
  timeoutID = setTimeout(() => {
    log()
  }, delta)
}
 
window.onkeydown = debounceLog
```

  * Immediate

实现：
Immediate是Debounce的精确版本。比起 Debounce 的 等待后续事件触发，然后再激活回调，Immediate 是 立即激活回调，然后等待后续事件在一定时间内触发。
```
var delta = 1000
var timeoutID = null
var safe = true
 
function log() {
  console.log('foo')
}
 
function immediateLog() {
  if (safe) {
    safe = false
    log()
  }
  clearTimeout(timeoutID)
  timeoutID = setTimeout(() => {
    safe = true
  }, delta)
}
 
window.onkeydown = immediateLog
```


**该特性是非标准的，请尽量不要在生产环境中使用它！**

## 面试套用

1、原理
2、使用场景
3、手写

## 参考
[文章1](https://www.html.cn/archives/6589)

http://www.alloyteam.com/2012/11/javascript-throttle/




