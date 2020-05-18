#  vue框架知识点

1. 前端框架的使用：vue & react
   1. 基本用法
   2. 高级特性
   3. 周边插件
9. Vue高级特性，不常用，体现你的技术深度
   1. 自己看文档，低效的方式；文档不是一个入门教程，是个新华字典，查询用的
   2. 文档泛泛细节多，不能突出重点，从文档中总结出考点和重点
10. Vue原理
    1. 组件化
       1. 组件化的发展
       2. 数据驱动视图
       3. mvvm
    2. 响应式数据
       1. Object.defineProperty & 缺点
       2. 监听对象，数组，深度监听
    3. 模板编译
       1. with语法
       2. 模板编译为 render函数
       3. 执行 render函数生成 vdom
    4. vdom
       1. vnode结构
    5. 渲染过程
       1. 初次渲染过程
       2. 更新过程
       3. 异步渲染
    6. 路由原理
       1. hash
          1.  onhashchange
       2. H5 history
          1. window.onpopState
          2. history.pushState







## Vue基础

1. vue-cli
2. vue基础用法
   1. 模板：slot插槽，插值 表达式 `{{}}`
   2. 指令，动态属性
      1. v-html，有 xss风险，会覆盖子组件
   3. computed & watch
      1. computed有缓存，data不变不会重新计算
      2. watch深度监听 `deep:true`，监听引用类型，拿不到 oldValue
   4. class & style
      1. 动态属性
      2. 驼峰规范
   5. v-if条件渲染
   6. 列表循环渲染
   7. 事件
   8. 表单验证
3. vue组件
   1. 生命周期
   2. props，类型和默认值
   3. v-on & $emit
   4. 自定义事件





## Vue高级特性

1. 自定义 v-model
2. $nextTick
3. ref
4. slot
5. is动态组件
6. 异步组件
7. keep-alive
8. mixin






## Vuex

1. state & getters & actions & mutation
2. dispatch
3. commit
4. mapSate & mapGetters & mapActions & mapMutations



### actoin & mutation有啥区别

1. action中处理异步，mutation不可以异步
2. mutation做原子操作，只能做一个操作
3. action可以整合多个 mutation





## Vue-Router

1. hash 默认路由默认
2. history 需要服务端支持
3. addRoutes
4. to & push
5. 路由懒加载，配合动态组件



### vue-router的原理

1. history
2. hash



```jsx
export default new VueRouter ({
  routes: [
    {
      path: '/user',
      component: () => import(/* webpackChunkName: 'user' */'components/User/index.vue')
    }
  ]
})
```









## Vue原理

1. 组件化 & mvvm
2. 响应式数据原理
3. vdom & diff算法
4. 模板编译
5. 组件渲染过程
6. 前端路由





## Vue3

1. 全部用 ts重写：响应式，vdom，模板编译
2. 性能提升，代码量减少
   1. 不是源代码减少，是编译打包后的代码减少
3. API调整
4. proxy重写响应式
   1. proxy存在浏览器兼容，切不能 polyfill
   2. Polyfill 是一块代码（通常是 Web 上的 JavaScript），为旧浏览器提供它没有原生支持的较新的功能，hack
      1. 比如说 polyfill 可以让 IE7 使用 Silverlight 插件来模拟 HTML Canvas 元素的功能，
      2. 模拟 CSS 实现 rem 单位的支持，或 [`text-shadow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-shadow)，或其他任何你想要的功
      3. https://developer.mozilla.org/zh-CN/docs/Glossary/Polyfill



### proxy

1. proxy 深度监听，性能更好；
   1. 可监听，新增，删除属性
   2. 可监听数组变化，能规避 Object.defineProperty的问题
   3. 无法 polyfill，兼容所有的浏览器
2. Object.defineProperty 缺点
   1. 深度监听，需要一次性的递归
   2. 无法监听新增属性和删除属性 Vue.set & Vue.delete
   3. 无法监听原生数组的 lenth 和下标
3. Reflect规范化，标准化，函数化
   1. Object能做的，Reflect也能做，慢慢的替代 Object
   2. Reflect和 proxy 能力对应

```jsx
const data = { user: 'lucy', age: 300 }
const data2 = [100, 200]

const proxyData = new proxy(data, {
  get (target, key, receiver) {
    const ownKey = Reflect.ownKeys(target) // 自身属性，不包括原型上的
    if (ownKey.includes(key)) {
    	console.log('get', key) // 只监听自身属性
    }
    return Reflect.get(target, key, receiver)
  }
  
  set (target, key, value, receiver) {
  	// 重复的设置，不处理
    if (target[key] === value) return true
  
  	console.log('set', key, value)
  	return Reflect.set(target, key, value, receiver)
	}

	deleteProperty(target, key) {
    console.log('delete property', key)
    return Reflect.deleteProperty(target, key)
  }
})

proxyData.push(300)

// ownKyes 自身属性，不包括 prototype
Reflect.ownKeys([10, 20]) // ["10", "20", "length"]
Reflect.ownKeys({a: 100, b: 200}) // ["a", "b"]

Object.getOwnPropertyNames(obj) // == Reflect.ownKeys(obj)

//
let obj = {a: 200} // 'a' in obj, delete obj.a
Reflect.has(obj, 'a') // true
Reflect.deleteProperty('a') // true
```


