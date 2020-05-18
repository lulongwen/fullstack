const data = {
  user: 'lucy',
  age: 300,
  info : {
    city: 'gaoshou'
  }
}

function reactive (target = {}) {
  // 如果不是对象或数组，就返回
  if (target == null || typeof target !== 'object') {
    return target
  }

  // 代理配置
  const proxyConf = {
    get (target, key, receiver) {
      const ownKey = Reflect.ownKeys(target) // 自身属性，不包括原型上的
      if (ownKey.includes(key)) {
        console.log('get', key) // 只监听自身属性
      }

      const result = Reflect.get(target, key, receiver)
       // 递归深度监听，如何提升性能？ 只有 get时，才去 proxy代理
       // 获取到那一层，那次层才会触发递归响应，proxy不是一次递归完成
      return reactive(result)
    },

    set (target, key, value, receiver) {
      // 重复的设置，不处理
      if (target[key] === value) return true

      const ownKey = Reflect.ownKeys(target)
      if (ownKey.includes(key)) {
        console.log('已有的 key', key)
      }
      else {
        console.log('新增的 key', key)
      }

      console.log('set', key, value)
      return Reflect.set(target, key, value, receiver)
    },

    deleteProperty(target, key) {
      console.log('delete property', key)
      return Reflect.deleteProperty(target, key)
    }
  }

  // 生成代理对象
  return new Proxy(target, proxyConf)
}

const proxyData = reactive(data)
