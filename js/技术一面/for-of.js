function muti(num) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(num * num)
    }, 1000)
  })
}

const nums = [1, 2, 3]

// 同步
nums.forEach(async (num) => {
  const res = await muti(num)
  console.log(res)
})

// 异步
!(async function() {
  for (let num of nums) {
    const res = await muti(num)
    console.log(res)
  }
})()