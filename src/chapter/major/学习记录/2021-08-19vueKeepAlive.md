keepAlive根据组件的name来进行缓存include和exclude的判断。
匹配的规则允许使用数组，字符串，正则的形式。
如果匹配不到，直接返回
如果匹配到了，初次渲染时，将vnode缓存，如果命中，则从缓存中取
```
var name = getComponentName(componentOptions);
var ref = this;
var include = ref.include;
var exclude = ref.exclude;
if (
  // not included
  (include && (!name || !matches(include, name))) ||
  // excluded
  (exclude && name && matches(exclude, name))
) {
  return vnode
}
```
如果配置了max(最多可以缓存多少组件实例),且已超过max，执行pruneCacheEntry,
参数是：cache, keys[0], keys, this._vnode
即销毁第一个缓存的组件实例以及该组件的缓存
```
  function pruneCacheEntry (
    cache,
    key,
    keys,
    current
  ) {
    var cached$$1 = cache[key];
    if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
      cached$$1.componentInstance.$destroy();
    }
    cache[key] = null;
    remove(keys, key);
  }
```
将已经缓存的组件打上keepAlive的标记
```
vnode.data.keepAlive = true; 
```

初始化KeepAlive的组件时：`initComponent`
```
vnode.elm = vnode.componentInstance.$el;
```
这里vnode会保留dom节点的信息，因此，keepAlive提供了max属性来限制

KeepAlive是一个抽象组件：

```
var KeepAlive = {
    name: 'keep-alive',
    abstract: true,

    props: {
      include: patternTypes,
      exclude: patternTypes,
      max: [String, Number]
    }
    ......
}
```
通常组件销毁执行destroy操作，Keep-alive缓存过的组件，不会执行实例的销毁，执行`deactivateChildComponent`，

```
destroy: function destroy (vnode) {
  var componentInstance = vnode.componentInstance;
  if (!componentInstance._isDestroyed) {
    if (!vnode.data.keepAlive) {
      componentInstance.$destroy();
    } else {
      deactivateChildComponent(componentInstance, true /* direct */);
    }
  }
}
// 目的是将vnode的_inactive属性设置为true，递归调用自组件。最后执行用户自定义的`deactivated`钩子
function deactivateChildComponent (vm, direct) {
    if (direct) {
      vm._directInactive = true;
      if (isInInactiveTree(vm)) {
        return
      }
    }
    if (!vm._inactive) {
      vm._inactive = true;
      for (var i = 0; i < vm.$children.length; i++) {
        deactivateChildComponent(vm.$children[i]);
      }
      callHook(vm, 'deactivated');
    }
  }
```

组件内部自带的钩子：
componentVNodeHooks: {
  init: function() {},
  prePatch: function() {},
  insert: function() {},
  destroy: function() {}
}

keepAlive组件的缓存优化

从代码上看，使用的是LRU，最近最少使用策略，LRU策略遵循的原则是，如果数据最近被访问(使用)过，那么将来被访问的几率会更高，如果以一个数组去记录数据，当有一数据被访问时，该数据会被移动到数组的末尾，表明最近被使用过。当数据溢出，则删除第一个数据。

常用的淘汰机制：
FIFO： 先进先出（通过数据使用的时间，溢出时，先处理时间间隔比较久的）
LFU：计数最少策略。

