// 重新定义数组原型的方法
const prototype = Array.prototype

// 创建新对象，原型指向 prototype 再扩展新的方法不会修改原始的原型方法
const arrProto = Object.create(prototype) // 创建的对象 __proto__ 原型上有数组的方法

const arr = ['pop', 'shift', 'unshift', 'push', 'splice']
arr.forEach(item => {
  arrProto[item] = function () {
    updateView()
    prototype[item].call(this, ...arguments)
  }
})


// 重新定义属性，监听变化
function defineReactive (target, key, value) {
   // 深度监听，一次性的递归到底，计算量大
  observer(value)

  Object.defineProperty(target, key, {
    get () {
      return value
    },

    set (newValue) {
      if (newValue !== value) {
        observer(newValue) // 一次性递归深度监听

        // 设置新值，value一直在闭包中，设置完成后，再 get时也是会获取
        value = newValue
        updateView() // 触发更新视图
      }
    }
  })
}

function updateView () {
  console.log('触发视图更新')
}


// 监听对象属性
function observer (target) {
  // 如果不是 对象或数组
  if (target == null || typeof target !== 'object') {
    return target
  }

  if (Array.isArray(target)) {
    target.__proto__ = arrProto
  }

  // 重新定义各个属性，for in可以遍历数组
  for (let key in target) {
    defineProperty(target, key, target[key])
  }
}


const data = {
  user: 'lucy',
  age: 20,
  info: {
    city: 'datong',
    food: 'apple' // 需要深度监听
  },
  arr: [100, 200]
}

// 监听数据
observer(data)

// 新增属性，监听不到 Vue.set
data.info.address = 'sanxi'

// 删除属性，监听不到 Vue.delete
delete data.age


data.arr.push(300)
