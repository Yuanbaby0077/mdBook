function getUrl(protocol, host, port) {
  return `${protocol}${host}${port}`
}

const getUrlByCurring = (protocol) => {
  return (host, port) => {
    return `${protocol}${host}:${port}`
  }
}

const httpProtocol = getUrlByCurring('https://')

console.log(httpProtocol('30.23.111.0', '8080'))


function add() {
  const args = Array.prototype.slice.call(arguments)
  const inner = function() {
    args.push(...arguments)
    console.log(args)
    return inner
  }

  inner.toString = function() {
    return args.reduce((a, b) => a + b)
  }
  return inner
}
let a = add(1)(2)(3)
let b = add(1,2)(3)
console.log(a, b, a==6, b==6)
// add(1)(2)(3)(4)(5)

class _VUE {
  data = null
  tag = null
  constructor(data, tag) {
    this.data = data
    this.tag = tag
  }
  mounted() {
    function mount() {
      this.update()
    }

    mount.call(this)
  }

  update() {
    console.log('update', this.data)
  }
}

const a1 = new _VUE({name: 'zs'})
a1.mounted()