/**
 * LRU(Least recently used) 最近最少使用
 * 是一种内存管理算法，最早应用于Linux操作系统
 * 该算法是基于，当访问量达到阈值时，移除掉最近最少使用的数据
 * LRU算法中，运用了哈希链表的数据结构
 * 这里使用数组简易处理，后面再升级。
 */

 class LRUCached {
  constructor(limit) {
    this.limit = limit
    this.keys = []
    this.cache = new Map()
  }

  /**
   * 切换到某一个缓存单元
   * 该缓存值移动到最近访问，即数组最后一项
   * 如果没有该缓存，返回-1
   * @param {*} k 
   * @returns 
   */
  get = (k) => {
    if (this.cache[k] === undefined) return -1
    this.remove(k)
    this.keys.push(k)
    return this.cache[k]
  }

  /**
   * 添加缓存节点 k, v
   * 1、如果不存在，则push[k]
   * 2、如果存在，则更新hash, cache[k] = v,不用push
   * 3、如果超过缓存容量，则删除最少访问的，即第一项 keys.shift()且从cache中移除
   * @param {*} k 
   * @param {*} v 
   */
  put = (k, v) => {
    if (!this.cache[k]) {
      this.keys.push(k)
    }
     this.cache[k] = v
    if (this.keys.length > this.limit) {
      const firstKey = this.keys[0]
      delete this.cache[firstKey]
      this.keys.shift()
    }
  }

  /**
   * 删除缓存中的某一项
   * @param {*} k 
   * @returns 
   */
  remove = (k) => {
    const index = this.keys.indexOf(k)
    if (index >= 0) {
      return this.keys.splice(index, 1)
    }
    return -1
  }
}

const lru = new LRUCached(5)
lru.put(1, 1)
lru.put(2, 2)
lru.put(3, 3)
lru.put(4, 4)
lru.put(5, 5)
lru.get(4)
lru.get(3)
lru.get(5)
lru.get(2)
lru.put(6, 7)
lru.put(5, 5)

console.log(lru.keys, lru.cache)