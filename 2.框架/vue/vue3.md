# vue3

1. 全部用 ts重写：响应式，vdom，模板编译

2. 性能提升，代码量减少

   1. 不是源代码减少，是编译打包后的代码减少

3. API调整

4. proxy重写响应式

   



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
4. proxy缺点：存在浏览器兼容，切不能 polyfill
   1. Polyfill 是一块代码（通常是 Web 上的 JavaScript），为旧浏览器提供它没有原生支持的较新的功能，hack
   2. 比如说 polyfill 可以让 IE7 使用 Silverlight 插件来模拟 HTML Canvas 元素的功能，
   3. 模拟 CSS 实现 rem 单位的支持，或 [`text-shadow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-shadow)，或其他任何你想要的功
   4. https://developer.mozilla.org/zh-CN/docs/Glossary/Polyfill



#### proxy响应式

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





















