# react面试题

1. react组件如何通信
2. jsx的本质是什么？
3. context是什么？有啥用途？
4. shouldComponentUpdate的用途？
5. 描述 redux单项数据流
6. setState是同步还是异步





### jsx的本质是什么

1. createElement
2. 执行返回 vnode



## 组件

1. 组件通信
2. 组件生命周期
3. 异步组件



### 组件之间如何通信

1. 父子组件 props
2. 自定义事件
3. Redux & Context



### Context是什么，怎么用？

1. 父组件，向下所有子组件传递数据
2. 如一些配置信息：主题色，语言等
3. 复杂的数据传递用 Redux



### 什么是纯函数

1. 返回一个新值，没有副作用（不会偷偷的修改其他值）
2. 重点：不可变的值，如：arr2 = arr.slice()



### 函数组件和 class组件的区别

1. 纯函数，输入 props，输出 jsx
2. 没有实例，没有生命周期，没有 state
3. 不能扩展其他方法



### 什么是受控组件

1. 表单的值，要受到 state的控制
2. 需要手动监听 onChange的值，更新 state
3. 对比非受控组件，响应式数据 v-model就是



### 何时用异步组件

1. 同 Vue，加载大组件，组件拆分
2. 路由的懒加载



### 多个组件的公共逻辑如何复用

1. 高阶组件 HOC
2. Render Props
3. mixin已被 React废弃





## react生命周期

1. 单组件生命周期
2. 父子组件生命周期
3. 注意 SCU



### ajax应该放在哪个生命周期

1. 同 vue，mounted
2. componentDidMount



### 渲染列表为啥要用 key

1. 同 Vue，必须用 key， 且不能是 index & random
2. diff算法中，通过 tag & key来判断是否是 sameVnode
3. 减少渲染次数，提高渲染性能
4. 必须用 key， 且不能是 index & random



### shouldComponentUpdate用途

1. 性能优化
2. 配合“不可变值”一起使用，否则会出错



### PureComponent有啥区别

1. 实现了浅比较 shouldComponentUpdate
2. 优化性能
3. 要结合“不可变的值”使用



### react事件 & DOM事件的区别

1. 所有事件都挂载到 document上
2. event不是原生的事件，是 SyntheticEvent合成的事件对象
3. dispatchEvent





## Redux





### Redux如何异步请求

1. 使用异步 action，如 redux-thunk





### react-router如何配置懒加载

1. lazy & Suspense
2. 配合 import 函数

```jsx
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { Suspense, lazy } from 'react'

const Home = lazy(() => import('./routes/Home'))
const About = lazy(() => import('./routes/About'))

const App = () => {
  <Router>
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/about" component={About}></Route>
      </Switch>
    </Suspense>
  </Router>
}
```







## React性能优化

1. 渲染列表时加 key
2. 自定义事件，DOM事件及时销毁
3. 合理使用异步组件
4. 减少函数 bind this 次数
5. 合理使用 SCU
   1. PureComponent
   2. memo
6. 合理使用 immutable.js
7. webpack层面优化
8. 前端通用的懒加载，如图片懒加载
9. 使用 SSR





























