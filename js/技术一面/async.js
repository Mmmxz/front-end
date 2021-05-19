async function fn1() {
  // return 100 // 相当于 return Promise.resolve(100)
  return Promise.resolve(200)
}

const res1 = fn1() // 执行 async 函数，会返回一个 Promise 对象
res1.then((data) => {
  console.log('res1', res1)
  console.log('data', data) // 100
})

// !用来分隔自执行函数前面的内容 防止没有;而报错
!(async function() {
  const p1 = Promise.resolve(300)
  const data1 = await p1 // await 相当于 Promise.then
  console.log('data1', data1)
})()

!(async function() {
  const data2 = await 400 // await Promise.resolve(400)
  console.log('data2', data2)
})()

!(async function() {
  const data3 = await fn1()
  console.log('data3', data3)
})()

!(async function() {
  const p4 = Promise.reject('err4') // rejected 状态
  try {
    const data4 = await p4
    console.log('data4', data4) // 不会输出
  } catch (ex) {
    console.error(ex) // try...catch 相当于 promise.catch
  }
})()