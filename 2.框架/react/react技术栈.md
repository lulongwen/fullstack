# react技术栈

## react基础

1. jsx
2. render函数
3. props
4. setState
5. 生命周期函数
6. context
7. react-router



## react组件

1. UI组件
   1. class只负责渲染，不负责逻辑
2. 容器组件
   1. connect方法执行的结果，关注业务逻辑
3. 无状态组件
   1. 只有一个 render函数；接收一个 props参数
4. 受控组件
   1. 受“状态”控制；状态不变化，视图就不变化
   2. 受控组件可以对输入的数据进行筛选
   3. 表单元素区分是谁？ 一般会增加一个name属性
5. 非受控组件
   1. 好处：直接获取dom元素，第三方库配合，不用配置state状态
   2. 非受控组件 一般用于没有初始值，想和第三方库配合
   3. createRef()
6. PureComponent
   1. 优化了shouldComponentUpadate，如果是同一个对象 不进行重渲染
   2. 视图是否更新，shouldComponentUpdate 返回的值是true 更新
   3. 只比较是否是同一个空间，是同一个空间不会更新
   4. 所以为了优化考虑更新时一定采用用一个新对象覆盖掉老对象
   5. PureComponent + immutablejs
7. 把页面拆分成组件：复用
   1. react视觉组件拆分
   2. redux store的状态设计
   3. redux action & reducer设计

```jsx
// UI Component


//
shouldComponentUpdate(nextProps, nextState) {
  console.log(nextState)
  return true
}

class Parent extends React.Component {
  // 静态方法中 this指向的不是实例；不能再调用setState，不需要再调用了
  static getDerivedStateFromProps(){
    return {a:1} // 不改状态
  }

  componentWillUnmount() {
    // 可以移除事件监听 ，和事件绑定 定时器
    console.log('child componentWillUnmount');
  }
}


//

//

//
```







### react-hooks





## 数据流管理

1. redux
2. react-redux
3. redux-middleware
4. redux-saga
5. dva
6. roadhog





## react框架

1. antd
2. antdpro
3. umi
4. antd-mobile