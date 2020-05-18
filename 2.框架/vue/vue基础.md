# vue基础

1. 模板：slot插槽，指令
2. computed & watch
3. class & style
4. v-if条件渲染

## 列表循环渲染

1. 如何遍历对象，可以用 v-for
2. key的重要性，key不能乱写，如 random 或 index
3. v-for & v-if不能一起使用
   1. v-for的计算优先级高于 v-if
   2. 每次循环完，还要再 v-if做一次判断



## 事件

1. event参数，自定义参数
   1. event是原生的
   2. 事件被挂载到当前元素
2. 事件修饰符
3. 事件被绑定到哪里



```jsx

increment1 (event) {
  console.log('event', event, event.target, event.__proto__.constructor)
  // 事件是被注册到当前元素上
  console.log('target', event.currentTarget)
}

事件修饰符

```





## 表单

1. v-model
2. 常见表单项
   1. textarea
   2. checkbox
   3. radio
   4. select





### 表单修饰符

1. lazy
2. number
3. trim





### 事件修饰符

1. 事件

```jsx
// 阻止事件冒泡传播
<a v-on:click.stop="fnClick"></a>

// 阻止默认提交事件
<form @submit.prevent="fnSubmit"></form>

// 只有修饰符
<form @submit.prevent></form>

//修饰符的串联
<a @click.stop.prevent="fnClick"></a>

// 事件捕获，先在此处理，然后才到达内部元素
<div @click.capture="fnClick"></div>

// 事件不是从内部元素触发的，当 ev.target是当前元素自身时才触发
<div @click.self="fnClick"></div>
```





### 键盘修饰符

1. ctrl & alt & shift

```jsx
// 点击按下 ctrl & shift键都会触发
<button @click.ctrl="fnClick"></button>

// 点击只有按下 ctrl键才会触发
<button @click.ctrl.exact="fnClick"></button>

// 没有任何修饰符被按下才会触发
<button @click.exact="fnClick"></button>
```





vue组件

1. 生命周期
2. props，类型和默认值
3. v-on & $emit
4. 自定义事件