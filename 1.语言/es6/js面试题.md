# js面试题

1. es6常用语法

2. 原型高级应用

3. 异步

   



### es6常用语法

1. class 与构造函数的区别
2. module模块化和编译环境
3. promise



### class 类

1. class 本质还是 prototype 的语法糖
2. 子类有 extends，必须要写 constructor & super

```jsx
class Parent {
  constructor (name) {
    this.name = name
  }
  
  say () {
    console.log(this.name)
  }
}

class Child extends Parent {
  constructor (name) {
    super(name)
  }
}
```





### 原型高级应用

1. 原型的实际应用
   1. jquery
   2. zepto
2. 如何扩展原型





### 异步的全面讲解

1. 异步的原理
   1. 什么是单线程，和异步的关系
   2. 什么是 event-loop
2. js的异步解决方案有那些
3. 如何用 jquery 解决异步
4. promise的标准
5. async & await的原理



### promise

1. callback hell 回调地狱
2. new Promise时，传入的函数要有 resolve & reject2个参数
3. then监听结果，成功执行 resolve，失败执行 reject





## 框架原理

1. 虚拟 DOM
2. Vue MVVM
3. React 组件化



### 虚拟DOM

1. 什么是 vdom，为何要用vdom，存在的价值
2. vdom如何使用？核心函数有那些
3. diff算法



### Vue

1. 如何理解 mvvm
2. vue如何实现响应式？
3. vue的模板解析？
4. vue的实现流程，模板渲染



### react

1. 组件化
   1. jsx是什么
   2. jsx & vdom的关系
   3. react的 setState

























