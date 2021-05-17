// 闭包隐藏数据，只提供 API
function createCache() {
  const data = {} // 闭包中的数据，被隐藏，不被外界访问
  return {
    set: function(key, value) {
      data[key] = value
    },
    get: function(key) {
      return data[key]
    }
  }
}

const c = createCache()
c.set('num', 100)
console.log(c.get('num'))