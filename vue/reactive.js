const isObject = v => typeof v === 'object'

function reactive(obj) {
  if (!isObject(obj)) {
    return obj
  }
  return new Proxy(obj, {
    get(target, key) {
      console.log('get', key)
      const res = Reflect.get(target, key)
      return isObject(res) ? reactive(res) : res
    },
    set(target, key, val) {
      console.log('set', key)
      const res = Reflect.set(target, key, val)
      return res
    },
    deleteProperty(target, key) {
      console.log('delete', key)
      res = Reflect.deleteProperty(target, key)
      return res
    }
  })
}

const obj = reactive({
  foo: 'fooo',
  a: { b: 1 }
})

// obj.foo
// obj.foo = 'foooooo'
// obj.bar = 'bar'
// delete obj.bar

obj.a.b