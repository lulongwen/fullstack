# dva

1. 定义 model模型
2. 定义 router路由
3. start渲染
4. create-react-app只是创建了一个最基本的reactdemo，需要手动安装 react-router,redux等
5. DVA 是基于 redux、redux-saga 和 react-router 的轻量级前端数据流框架

1. 1. dva = redux + redux-saga + react-router
   2. dva没有新概念，只是封装了redux
   3. react视图层框架 + dva数据流框架 = 复杂的SPA应用架构

1. dva特点

1. 1. 数据共享 models，数据可以 connect任何组件
   2. 数据和视图逻辑分离，effects
   3. 异步请求





## dva创建项目



### dva-cli创建项目

1. 全局安装 dva-cli

```bash
npm install dva-cli -g  # 全局安装 dva-cli
dva -v
# dva-cli version 0.10.1

dva new mydva  # 创建项目
cd mydva

npm i antd babel-plugin-import --save # 安装antd 按需加载
npm i axios

npm install
npm start # 启动项目
```

2. .webpackrc，使 babel-plugin-import 插件生效，antd按需加载

```jsx
{
  "extraBabelPlugins": [
    [
      "import", 
      { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }
    ]
  ]
}
```





### npx创建项目

```bash
npx create-react-app mydva
cd mydva

npm i dva redux react-redux react-router-dom connected-react-router history
npm start
```





### dva目录

```tree
├── mock    // mock数据
├── node_modules
├── public  // 存放公共文件
├── src  // 重要，代码都在这个文件夹下
│   ├── assets // 存放公共的静态资源
│   ├── components // 公共组件
│   ├── models // 存放模型，所有的数据交互及逻辑都在这里；通过connect跟routes里面的组件进行绑定
│   ├── routes // 路由组件，通俗理解就是页面，会跟model里的数据模型关联起来
│   ├── services // ajax请求后台接口
│   ├── utils // 工具类
│   ├── index.css
│   ├── index.ejs // ejs模板引擎
│   ├── index.js // 入口文件
│   └── router.js // 项目路由文件
│
├── .eslintrc // bower安装目录的配置
├── .editorconfig // 保证代码在不同编辑器可视化的工具
├── .gitignore // git上传时忽略的文件
├── .roadhogrc.js // 项目的配置文件，配置接口转发，css_module等都在这边。
├── .roadhogrc.mock.js // 项目的配置文件
└── package.json // 项目的依赖
```



## dva使用步骤

1. routes 定义路由
2. 把这个路由添加到 /router.js
3. components 新建组件
4. 定义 model 处理数据和逻辑
5. 一定要在 index.js 引入 model
6. connect链接 model和 component，在 routes/Todo/Todo.js

```jsx
import React from 'react'
import dva from 'dva'

const app = dva()
/**
  reducer都有自己的初始化状态和 reducer处理函数
  namespace，redux里面的 combineReducers({todo: todo})

  reducers 就是
  function reducer(state, action) {
    if (action.type === 'add') {
      return { number: state.number + 1 }
    }
  }
 */
app.model({
  namespace: 'user',
  state: {
    number: 10
  },
  reducers: {
    add (state, action) {
      return { number: state.number + 10 }
    },
    minus (state, action) {
      return { number: state.number - 10 }
    }
  }
})

const Todo = props => {
  const { number, dispatch } = props
  return (
    <div>
      <h2>{number}</h2>
      <button onClick={() => dispatch({ type: 'user/add' }) }>加加</button>
      <button onClick={() => dispatch({ type: 'user/minus' }) }>减一</button>
    </div>
  )
}

const Counter = connect(state => state.user)(Todo)

// 定义路由
app.router(() => <Counter />)
app.start('#root')
```







## connect

1. connect接收一个函数，返回的函数也是一个 React 组件，通常称为容器组件
2. 返回的是原始 UI 组件的容器，即在外面包了一层 `State`。
3. `connect` 方法传入的第一个参数是 `mapStateToProps` 函数，
4. 函数需要返回一个对象，用于建立 `State` 到 `Props` 的映射关系

```jsx
const mapStateToProps = state => {
  return {
    // state.user 是命名空间；state.user.user 是命名空间下的数据
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => ({
  usersAction: bindActionCreators(userAction, dispatch),
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
```





## @connect

1. @是 es7的语法，dva的装饰器语法，用来装饰 class组件；
2. 和 connect方法类似，将 model 和 component 串联起来，是 connect的语法糖
3. @connect必须放在export default class前面
4. @connect(state => {}, dispatch => ({})); `@connect(state, dispatch)`

```jsx
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import TodoList from '../../components/TodoList';

@connect(state => {
  console.log('@', state)
  const { todo } = state
  return {
    tbody: todo.tbody
  }
}, dispatch => ({
  fnDelete(id) {
    const action = { type: 'todo/delete', payload: id }
    dispatch(action)
    console.log('delete', id)
  }
}))

class Todo extends PureComponent {
  render () {
    const { fnDelete, tbody }  = this.props
    console.log('props', this.props)

    return (
      <div>
        <h2>List of Products</h2>
        <TodoList onDelete={fnDelete} tbody={tbody} />
      </div>
    );
  }
}
export default Todo
```

1. @装饰器写法 @connect(state, dispatch)

```jsx
@connect(state => ({
    user: state.user.user,
  }),
  dispatch => ({
    ...bindActionCreators({
      usersAction: usersAction
    }, dispatch)
  })
)
class Main extends Component {

}
export default Main
```

2. saga的写法：this.props.dispatch

```jsx
@connect(state => ({
    user: state.user.user,
})
)

class Main extends Component {
    componentDidMount () {
        this.props.dispatch({
            type: 'user/saveUser',
        })
    }
}
export default Main
```









