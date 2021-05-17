const xhr = new XMLHttpRequest()
// true 代表请求是异步的
xhr.open('get', '/data/test.json', true)
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.responseText), 100)
      alert(xhr.responseText)
    } else if (xhr.status === 404) {
      console.log('404 not found')
    } else {
      console.log('其他情况')
    }
  }
}
// get 请求
xhr.send(null)
// post请求写法 本地无法演示
// const postData = {
//   userName: 'zhangsan',
//   password: 'xxx'
// }
// xhr.send(JSON.stringify(postData))

// 手写简易 ajax
function ajax(url) {
  const p = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        } else if (xhr.status === 404) {
          reject(new Error('404 not found'))
        }
      }
    }
    xhr.send(null)
  })
  return p
}
const url = '/data/test.json'
ajax(url).then(res => {
  console.log(res, 200)
}).catch(err => {
  console.error(err)
})