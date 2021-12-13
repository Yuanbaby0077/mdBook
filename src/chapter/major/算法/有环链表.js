/**
 * 解法一：快慢指针
 * @param {ListNode} head
 * @return {boolean}
 */
// var hasCycle = function(head) {
//     let c1 = c2 = head
//     while(c1 && c2 && c2.next) {
//         c1 = c1.next
//         c2 = c2.next.next
//         if (c2 === c1) return true
//     }
//     return false
// };

// 解法二：遍历节点，map存储已遍历节点
var hasCycle = function(head) {
  let cur = head
  const map = new Map()
  while(cur) {
      if (map.has(cur)) return true
      map.set(cur, null)
      cur = cur.next
  }
  return false
};