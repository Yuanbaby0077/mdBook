
export function def (obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

const _toString = Object.prototype.toString

// function isObject(value) {
//   return Object.prototype.toString.call(value).slice(8, -1) === 'Object'
// }

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj): boolean {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject(value) {
  return _toString.call(value) === '[object Object]'
}

function hasOwn(obj, val) {
  return Object.prototype.hasOwnProperty.call(obj, val)
}

export function observe (value: any, asRootData: ?boolean): Observer | void {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  let ob: Observer | void
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value)
  }
  if (asRootData && ob) {
    ob.vmCount++
  }
  return ob
}
/**
 * Observer类是为了收集依赖和触发更新
 */
export class Observer {
  value: any
  // dep: Dep
  vmCount: number

  constructor(value: any) {
    this.value = value
    // 每个Observer实例的value上都有__ob__属性，
    // 表示数据已经是响应式的，避免重复操作, 不可枚举
    def(value, '__ob__', this)

    if (Array.isArray(value)) {

    } else {
      this.walk(value)
    }
  }

  walk(obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
}

function defineReactive(obj: Object, key: string, val?: any) {
  // 获取属性的描述信息
  const property = Object.getOwnPropertyDescriptor(obj, key)
  // 如果定义了描述信息且不能配置，则不做检测
  if (property && property.configurable === false) return
  // getter/setter默认为描述信息中定义的get和set方法
  const getter = property && property.get
  const setter = property && property.set

  // ？？？ 如果参数只有obj和key，那么值就是obj[key]
  if (arguments.length === 2) {
    val = obj[key]
  }

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      // 收集依赖
      dep.depend()
      console.log(`${key}属性被读取了`);
      return val
    },
    set: function(newVal) {
      // 通知依赖更新
      if(val === newVal){
        return
      }
      val = newVal;
      dep.notify()
    }
  })
}

const car = {
  name: 'abc',
  price: '3000$'
}

new Observer(car)

car.name = 'BMW'
car.price = '4000$'

console.log(car)

// name属性被修改了
// price属性被修改了