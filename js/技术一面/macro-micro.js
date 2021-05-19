// console.log(100)
// setTimeout(() => {
//   console.log(200)
// })
// Promise.resolve().then(() => {
//   console.log(300)
// })
// console.log(400)

async function async1() {
  console.log('async1 start', 2)
  await async2()
  // 微任务
  console.log('async1 end', 6)
}

async function async2() {
  console.log('async2', 3)
}

console.log('script start', 1)

// 宏任务
setTimeout(() => {
  console.log('setTimeout', 8)
}, 0)

async1()

new Promise((resolve) => {
  console.log('promise1', 4)
  resolve()
}).then(() => {
  // 微任务
  console.log('promise2', 7)
})

console.log('script end', 5)
// 同步代码执行完成 Call Stack 被清空
// 执行微任务
// 尝试触发 dom 渲染
// 触发 event loop，执行宏任务
