function loadImg(src) {
  const p = new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.onload = () => {
      document.body.appendChild(img)
      resolve(img)
    }
    img.onerror = () => {
      const err = new Error('图片加载失败', src)
      reject(err)
    }
    img.src = src
  })
  return p
}

const url1 = 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2844230998,1581957414&fm=26&gp=0.jpg'
const url2 = 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=985920320,3811487102&fm=26&gp=0.jpg'
loadImg(url1).then(img1 => {
  console.log(img1.width)
  return img1
}).then(img1 => {
  console.log(img1.height)
  return loadImg(url2) // promise 实例
}).then().then(img2 => {
  console.log(img2.width)
  return img2
}).then(img2 => {
  console.log(img2.height)
}).catch(err => {
  console.error(err)
})
