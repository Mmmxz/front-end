const input = document.getElementById('input')
// let timer = null
// input.addEventListener('keyup', function (e) {
//   if (timer) {
//     clearTimeout(timer)
//   }
//   timer = setTimeout(() => {
//     console.log(e.target.value)
//     timer = null
//   }, 1000)
// })

function debounce(fn, delay = 500) {
  // timer 在闭包中
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}
input.addEventListener('keyup', debounce(function (e) {
  console.log(e.target.value)
}, 1000))