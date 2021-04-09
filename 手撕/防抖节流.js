/**
 * 简易防抖函数 只能在延迟时间结束后执行
 * @param {function} fn 需要防抖的函数
 * @param {number} delay 延迟执行时间
 * @returns {function} 返回一个函数
 */
// function debounce(fn, delay) {
//   let timer = 0
//   return function () {
//     if (timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(() => {
//       fn.apply(this, arguments)
//     }, delay)
//   }
// }

/**
 * 完整版防抖函数
 * @param {funtion} fn 需要防抖的函数
 * @param {number} delay 延迟执行时间
 * @param {boolean} immediate 是否立即执行
 * @returns {funtion} 返回调用函数
 */
function debounce(fn, delay = 50, immediate = true) {
  let timer, context, args

  // 延迟执行函数
  const later = () => setTimeout(() => {
    // 延迟函数执行完毕 清空缓存的定时器序号
    timer = null
    // 延迟执行的情况下 函数会在延迟函数中执行
    // 使用之前缓存的参数和上下文
    if (!immediate) {
      fn.apply(context, args)
      context = args = null
    }
  }, delay)

  return function (...params) {
    // 如果没有创建延迟执行函数 later 则创建一个
    if (!timer) {
      timer = later()
      // 如果是立即执行 调用函数
      // 否则缓存参数和上下文
      if (immediate) {
        fn.apply(this, params)
      } else {
        context = this
        args = params
      }
    // 如果已经有延迟执行函数 调用时清除并重新设置一个 让延迟函数可以重新计时
    } else {
      clearTimeout(timer)
      timer = later()
    }
  }
}

/**
 * 节流函数 返回函数连续调用时 func 执行频率限定为 次 / delay
 * @param {function} fn 回调函数
 * @param {number}} delay 时间窗口的间隔
 * @param {object} options 如果想忽略开始函数的的调用 传入{leading: false}
 *                         如果想忽略结尾函数的调用 传入{trailing: false}
 *                         两者不能共存 否则函数不能执行
 */
function throttle(fn, delay, options) {
  let context, args, result
  let timeout = null
  // 之前的时间戳
  let previous = 0
  if (!options) {
    options = {}
  }
  // 定时器回调函数
  const later = function () {
    // 如果设置了 leading 则将 previous 设置为 0
    // 用于下面函数的第一个 if 判断
    previous = options.leading === false ? 0 : new Date().getTime()
    // 置空一是为了防止内存泄漏，二是为了下面的定时器判断
    timeout = null
    result = fn.apply(context, args)
    if (!timeout) {
      context = args = null
    }
  }
  return function () {
    // 获得当前时间戳
    const now = new Date().getTime()
    // 首次进入前者肯定为 true
	  // 如果需要第一次不执行函数
	  // 就将上次时间戳设为当前的
    // 这样在接下来计算 remaining 的值时会大于0
    if (!previous && options.leading === false) {
      previous = now
    }
    // 计算剩余时间
    const remaining = delay - (now - previous)
    context = this
    args = arguments
    // 如果当前调用已经大于上次调用时间 + wait
    // 或者用户手动调了时间
 	  // 如果设置了 trailing，只会进入这个条件
	  // 如果没有设置 leading，那么第一次会进入这个条件
	  // 还有一点，你可能会觉得开启了定时器那么应该不会进入这个 if 条件了
	  // 其实还是会进入的，因为定时器的延时
	  // 并不是准确的时间，很可能你设置了2秒
	  // 但是他需要2.2秒才触发，这时候就会进入这个条件
    if (remaining <= 0 || remaining > delay) {
      // 如果存在定时器就清理掉否则会调用二次回调
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = fn.apply(context, args)
      if (!timeout) {
        context = args = null
      }
    } else if (!timeout && options.trailing !== false) {
      // 判断是否设置了定时器和 trailing
	    // 没有的话就开启一个定时器
      // 并且不能不能同时设置 leading 和 trailing
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}