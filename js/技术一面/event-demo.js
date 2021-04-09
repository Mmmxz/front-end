// 通用的事件绑定函数 兼容普通绑定和代理绑定
function bindEvent(elem, type, selector, fn) {
  if (fn == null) {
    fn = selector
    selector = null
  }
  elem.addEventListener(type, event => {
    const target = event.target
    if (selector) {
      // 代理绑定
      if (target.matches(selector)) {
        fn.call(target, event)
      }
    } else {
      // 普通绑定
      fn.call(target, event)
    }
  })
}
const btn1 = document.getElementById('btn1')
bindEvent(btn1, 'click', function (event) {
  // console.log(event.target) // 获取触发的元素
  event.preventDefault() // 阻止默认行为
  alert(this.innerHTML)
})

// 事件冒泡
const p1 = document.getElementById('p1')
bindEvent(p1, 'click', function (event) {
  event.stopPropagation() // 阻止冒泡
  console.log('激活')
})
const body = document.body
bindEvent(body, 'click', function (event) {
  console.log('取消')
})

// 事件代理
const div3 = document.getElementById('div3')
bindEvent(div3, 'click', 'a', function (event) {
  event.preventDefault()
  // 避免每个 a 标签都挂载事件监听
  // const target = event.target
  // if (target.nodeName === 'A') {
  //   alert(target.innerHTML)
  // }
  alert(this.innerHTML)
})