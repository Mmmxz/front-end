function fn1(a, b, c) {
  console.log('this', this)
  console.log(a, b, c)
  return 'this is fn1'
}

const fn2 = fn1.bind({ x: 100 }, 10, 20, 30)
const res1 = fn2()
console.log('bind:', res1)

// 手写 bind
Function.prototype.myBind = function() {
  // 将参数转为数字
  const arr = Array.prototype.slice.call(arguments)
  // 获取 this （数组第一项）
  const t = arr.shift()
  // fn1.bind(...) 中的 fn1 后面要执行
  const self = this
  // 返回一个函数
  return function() {
    // fn1()
    return self.apply(t, arr)
  }
}

const fn3 = fn1.myBind({ x: 100 }, 10, 20, 30)
const res2 = fn3()
console.log('myBind:', res2)