// async function async1() {
//   console.log('async1 start') // 2 重要
//   await async2()
//   // await 的后面，都可以看作是 callback 的内容，即异步
//   // 类似， event loop 、 setTimeout(cb)
//   // setTimeout(function() { console.log('async1 end') })
//   // Promise.resolve().then(() => console.log('async1 end'))
//   console.log('async1 end') // 5
// }

// async function async2() {
//   console.log('async2') // 3 重要
// }

// console.log('script start') // 1
// async1()
// console.log('script end') // 4
// // 同步代码已执行完成 (event loop)

async function async1() {
  console.log('async1 start', 2) // 2
  await async2()
  console.log('async1 end', 5) // 5
  await async3()
  console.log('async1 end 2', 7) // 7
}

async function async2() {
  console.log('async2', 3) // 3
}

async function async3() {
  console.log('async3', 6) // 6
}

console.log('script start', 1) // 1
async1()
console.log('script end', 4) // 4
// 同步代码执行完成