function twoCount(arrs, target) {
  const map = new Map()
  for (let i = 0; i < arrs.length; i++) {
    const cur = arrs[i]
    if (!map.has(cur)) {
      map.set(cur, i)
    }

    const value = target - cur
    if (map.has(value) && map.get(value) !== i) {
      return [map.get(target-cur), i]
    }
  }
  return []
}

console.log(twoCount([1,2,3,4, 5], 1))