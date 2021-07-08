function fn() {
  console.log(arguments)
}

var timerId = setTimeout(fn, 1000, 'zs', 23)

// setTimeout实现


