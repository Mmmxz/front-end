// 3s 把宽度从 100px 变为 640px 即增加 540px
// 60帧/s 3s 180帧 每次变化 3px

const $div1 = $('#div1')
let curWidth = 100
const maxWidth = 640

function animate() {
  curWidth += 3
  $div1.css('width', curWidth)
  if (curWidth < maxWidth) {
    // setTimeout(animate, 16.67) // setTimeout 自己控制时间
    window.requestAnimationFrame(animate) // RAF 浏览器控制时间
  }
}
animate()