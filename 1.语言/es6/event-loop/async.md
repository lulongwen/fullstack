# async

1. event-loop
2. jquery的 Deferred
3. [promise实现原理](#三 Promise)
4. async & await





## 一 单线程

1. 只有一个线程，同一时间只能做一件事；两段 js不能同时执行
   1. 原因：避免 DOM渲染的冲突
   2. 单线程的解决方案：异步 event-loop
2. 避免DOM渲染冲突
   1. 浏览器需要渲染 DOM，JS可以修改DOM结构
   2. JS执行的时候，浏览器DOM渲染会暂停
   3. 2段代码不能同时执行，都修改DOM就冲突了
3. **webwork支持多线程**，但不能访问 DOM

```jsx
// 单线程，等待计算结果：同一时间，只能做一件事，代码执行完，才往下走
let num = 0
for(let i = 0; i< 10000000; i++) {
  num += i
}
console.log('num',num)
console.log(200)

// 异步
let num = 0
for(let i = 0; i< 10000000; i++) {
  num += i
}
setTimeout(() => {
  console.log('num',num)
})
console.log(200)
```



### 单线程和异步的关系

1. 避免DOM渲染冲突
2. 实现原理 event-loop
3. 异步无法改变 JS单线程本质





### event-loop 事件循环

1. 先同步，后异步
2. 异步队列分宏任务队列 & 微任务队列
   1. 先清空微任务，后清空宏任务
3. 同步代码执行完，循环执行异步队列





## 二 Deferred

1. jquery 的异步演化
2. jquery 1.5+ 对 ajax的封装
   1. deferred 演化的 Promise规范
3. 目的：解耦代码，体现了开放封闭原则

```jsx
const ajax = $.ajax({
  url: 'data.json',
  success () {
    console.log(100)
  },
  fail () {
    console.log('fail')
  }
})

const ajax = $.ajax('data.json') // 返回一个 deferred 对象
ajax
  .done(() => {
  	console.log(100)
  })
  .fail(() => {
		console.log('fail')
  })
  .done(() => {
		 console.log(200)
  })

// then方法，很像 Promise
ajax
  .then(() => {
  	console.log(100)
  }, err => {
  	console.log('100 error')
	})
  .then(() => {
    console.log(200)
  }, err2 => {
    console.log('200 error2')
  })
```





### 回调函数

1. 回调地狱







### Deferred

1. $.Deferred有 resolve & reject方法

```jsx
function waitHandle () {
  const dfd = $.Deferred()
  // 传入 deferred对象，有 resolve & reject方法
  const wait = function
    const task = function() {
      dfd.resolve() // 成功调用 resolve
      // dfd.reject() 异步任务失败
    }
    setTimeout(task, 2000)
    return dfd // 要求返回 Deferred对象
  	// return dfd.promise() // 返回 promise就不能再用 reject & resolve方法，报错，只能用 then
  }
  
  return wait(dfd) // 一定要有返回值，然后 then方法调用
}

// 调用
const fn = waitHandle()
// fn.then(() => {}, () => {})
fn.then(() => {
  console.log('ok')
}, () => {
  console.log('error')
}).then(() => {}, () => {})
```



### deferred方法

1. 一类：dfd.resolve & dfd.reject
2. 一类：dfd.then & dfd.done & dfd.fail
   1. `return dfd.promise()` 只能 then监听，不能修改状态

```jsx
Object.keys($.Deferred())
[
  "resolve", "resolveWith", "reject", 
  "rejectWith", "notify", "notifyWith", 
  "state", "always", "then", "promise", 
  "pipe", "done", "fail", "progress"
]
```







## 三 Promise

1. 异常捕获
   1. `then`只接受成功的回调，统一用` catch`捕获异常
   2. `try{} catch(e) {}` 捕获同步异常
2. 多个串联，上一个的返回值就是下一个 then的参数

```jsx
fn.then(() => {
  return 300 // 上一个的返回值就是下一个 then的参数
})
.then(res => {
  console.log(res)
})
```



3. Promise.all & Promise.race

```jsx
Promise.all([p1, p2, p3]).then(datas => {
  // 返回的是一个有序的数组
  console.log(datas)
})

// race只有一个返回结果，有一个成功就执行 success
Promise.rece([p1, p2, p3]).then(res => {
  console.log(data)
})
```





### promise标准

1. 技术推广需要一套标准来支撑，任何不符合标准的都将被用户抛弃
   1. 生态圈的重要性
2. Promise A+规范
   1. 状态变化
   2. then函数



### Promise A+规范

1. 三种状态：pending & fulfilled & rejected
   1. pending 默认状态
   2. pending 变为 fulfilled 或 rejected
   3. 状态变化不可逆，只能成功或失败
2. Promise必须实现 then方法，then返回的必须是一个 Promise实例，实现链式调用
3. then() 接收 executor函数，传入 resolve & reject参数







## 四 async & await

1. 使用 await，函数必须要加上 async
2. async异步代码同步化
3. async 实现 promise.all





### generator & itrator

















