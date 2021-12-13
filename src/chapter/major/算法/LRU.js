/**
 * @param {number} capacity
 */
 var LRUCache = function(capacity) {
  this.capacity = capacity
  this.cache = new Map()
};

/** 
 * 获取数据 get(key) - 如果密钥 (key) 存在于缓存中，
 * 则获取密钥的值（总是正数），否则返回 -1。
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function(key) {
  const res = this.cache.get(key)
  if (!res) return -1
  // 更新当前被访问的元素，放到队尾
  this.cache.delete(key)
  this.cache.set(key, res)
  return res
};

/** 
* @param {number} key 
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function(key, value) {
  // 如果缓存中没有
  if (!this.cache.has(key)) {
    // 如果超出capacity 则删除第一个元素
    if (this.cache.size >= this.capacity) {
      const deleteKey = [...this.cache.keys()][0]
      this.cache.delete(deleteKey)
    }
  } else {
    this.cache.delete(key)
  }
  // 3、更新缓存
  this.cache.set(key, value)
  return this.elements
};
// var c = new LRUCache(2)


