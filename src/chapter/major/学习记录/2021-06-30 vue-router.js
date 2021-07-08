/**
 * mode
 */

switch (mode) {
  case 'history':
    this.history = new HTML5History(this, options.base)
    break
  case 'hash':
    this.history = new HashHistory(this, options.base, this.fallback)
    break
  case 'abstract':
    this.history = new AbstractHistory(this, options.base)
    break
  default:
    if (process.env.NODE_ENV !== 'production') {
      assert(false, `invalid mode: ${mode}`)
    }
}
// mode值为hash或者history
// hash 可通过window.location.hash获取，特点是：hashHistory不会被包含在http请求中，
// 是用来指导浏览器动作，与服务端无关。改变hash不会重新加载页面。