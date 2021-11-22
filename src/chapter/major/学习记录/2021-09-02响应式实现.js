(function (global) {
  class MyVue {
    constructor(options) {
      this.options = options
      this.initData(options)
      if (this.options.el) {
        this.mount(options.el)
      }
    }

    initData(options) {
      if (!options.data) return
      this.data = options.data
      // 重写对象的setter和getter
      ob = new Observer(options.data)
    }

    mount(el) {
      const updateComponent = () => {
        let str = ''
        Object.key(this.options.data).forEach((i) => {
          str += `${i}=${this.options.data[i]}`
        })
        document.querySelector(el).innerHTML = str
      }
      new Watcher(this, updateComponent, true /* isRenderWatcher */);
    }
  }

  class Observer {
    constructor(value) {
      this.value = value
      this.walk(value)
    }

    walk(obj) {
      var keys = Object.keys(obj);
      for (var i = 0; i < keys.length; i++) {
        defineReactive(obj, keys[i]);
      } 
    }
  }

  /**
   * 实例化watcher 并更新数据的状态的时间点是：渲染vNOde到真实DOM时可以创建Watcher。
   * 实例化Watcher相当于是创建依赖，数据在哪里被使用，就需要产生一个依赖，当数据发生改变时，set方法会
   * 通知到每一个依赖进行更新。渲染Watcher就是渲染DOM时使用数据产生的依赖。
   */
  class Watcher {
    constructor(
      vm,
      expOrFn,
      cb,
      options,
      isRenderWatcher
    ) {
      this.vm = vm
      this.getter = expOrFn
      // Watcher.prototype.get的调用会进行状态的更新。
      this.get()
    }

    get() {
      Dep.target = this;
      const vm = this.vm
      value = this.getter.call(vm, vm);
    }

    update() {
      this.get()
    }
  }

  // watcher可以理解为每个数据都需要监听的依赖，那么Dep就是对依赖的管理。数据既可以在渲染中使用，
  // 也可以在计算属性中使用。每个数据对应的watcher有很多，而更新数据的时候需要通知到数据相关的
  // 每一个依赖，就需要Dep通知管理。并且浏览器同一时间只能更新一个watcher，所以需要记录当前更新的
  // watcher。Dep的职责就是：将依赖进行收集，然后派发依赖进行更新。
  var uid = 0;
  class Dep {
    constructor() {
      this.id = uid++;
      this.subs = [];
    }

    // 依赖收集
    depend() {
      if (Dep.target) {
        this.subs.push(Dep.target)
      }
    }

    // 派发更新
    notify () {
      // stabilize the subscriber list first
      var subs = this.subs.slice();
      for (var i = 0, l = subs.length; i < l; i++) {
        subs[i].update(); // 遍历dep中的依赖，对每个依赖进行更新操作。
      }
    };
  }
  Dep.target = null
})(global)

/**
 * 响应式构建的核心。
 */
function defineReactive(
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      if (Dep.target) {
        dep.depend()
      }
      return val
    },
    set: function reactiveSetter (newVal) {
      // 派发更新
      val = newVal;
      dep.notify();
    }
  });
}
var vm = new MyVue(
  {
    el: '#app',
    data: {

    }
  }
)