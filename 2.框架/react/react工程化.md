# react工程化

1. antd按需加载
2. less配置
3. alias别名配置
4. 全局loading





## webstorm快捷键

1. rcc + tab
2. rccp + tab
3. rcfc + tab
4. rcjc + tab



### rcc + tab

1. 创建一个默认导出的 class组件

```jsx
import React, {Component} from 'react'
class CityItem extends Component {
  render() {
    return (
      <div></div>
    )
  }
}
export default CityItem
```



### rccp + tab

1. 创建一个 class组件，带 PropTypes验证

```jsx
import React, {Component} from 'react'
import PropTypes from 'prop-types'
class CityItem extends Component {
  render() {
    return (
      <div></div>
    )
  }
}
CityItem.propTypes = {}
export default CityItem
```



### rcfc + tab

1. 创建一个：默认导出 的class 组件
2. PropTypes，所有生命周期方法

```jsx
import React, {Component} from 'react'
import PropTypes from 'prop-types'

class CityItem extends Component {
  constructor(props) {
    super(props)
    
  }
  
  componentWillMount() {
    
  }
  
  componentDidMount() {
    
  }
  
  componentWillReceiveProps(nextProps) {
    
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    
  }
  
  componentWillUpdate(nextProps, nextState) {
    
  }
  
  componentDidUpdate(prevProps, prevState) {
    
  }
  
  componentWillUnmount() {
    
  }
  
  render() {
    return (
      <div>
      
      </div>
    )
  }
}
CityItem.propTypes = {}
export default CityItem
```



### rcjc + tab

1. 创建一个：class 组件，无默认导出

```jsx
class CityItem extends Component {
  render() {
    return (
      <div></div>
    )
  }
}
```





## alias 别名配置

1. resolve.alias 配置别名

```jsx
alias: {
  'react-native': 'react-native-web',
  // Allows for better profiling with ReactDevTools
  ...(isEnvProductionProfile && {
    'react-dom$': 'react-dom/profiling',
    'scheduler/tracing': 'scheduler/tracing-profiling',
  }),
  '@': path.resolve(__dirname, '../src'),
  '@views': path.resolve(__dirname, '../src/views'),
  '@store': path.resolve(__dirname, '../src/store'),
  '@utils': path.resolve(__dirname, '../src/utils'),
  '@components': path.resolve(__dirname, '../src/components'),
  ...(modules.webpackAliases || {}),
},
```

2. webstorm 别名设置
3. vscode别名设置
4. 插件别名 https://blog.csdn.net/zhuiacj/article/details/103326391





## less配置

1. 默认支持 css，使用less要安装 less
2. loader解析从后向前，从右向左
3. yarn eject 暴露 webpack配置，修改less-loader

```jsx
yarn add less less-load

// 1 webpack.cinfog.js 50行，复制 sassRegex
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

//2 74行修改 getStyleLoaders 函数，css-loader 下添加代码 lessOptions
const getStyleLoaders = (cssOptions, lessOptions, preProcessor) => {
  {
    loader: require.resolve('less-loader'),
    options: lessOptions,
  },
}

//3 456行，复制 cssModuleRegex
{
  test: lessRegex,
  exclude: cssModuleRegex,
  use: getStyleLoaders({
    importLoaders: 1,
    sourceMap: isEnvProduction && shouldUseSourceMap,
  }),
  // Don't consider CSS imports dead code even if the
  // containing package claims to have no side effects.
  // Remove this when webpack adds a warning or an error for this.
  // See https://github.com/webpack/webpack/issues/6571
  sideEffects: true,
},
{
  test: lessModuleRegex,
  use: getStyleLoaders({
    importLoaders: 1,
    sourceMap: isEnvProduction && shouldUseSourceMap,
    modules: {
      getLocalIdent: getCSSModuleLocalIdent,
    },
  }),
},
```



### importLoaders

1. 1 post-css-loader
2. 0 no loaders 默认
3. 2 postcss-loader, sass-loader





## antd按需加载

1. 运行了eject ，webpack配置了babelrc: false ,单独根目录新建.babelrc会报错的
2. 在webpack.dev.js配置，在module模块 ,loader: require.resolve('babel-loader')对象中的plugins数组中添加
3. 按需加载不需要引入  import 'antd/dist/antd.css'

```jsx
plugins: [
  [
    "import", //移动端添加 "libraryName": "antd-mobile"
    {libraryName: "antd", style: 'css'}
  ],
]
```



### babel-plugin-import

1. style: https://www.npmjs.com/package/babel-plugin-import
   1. true 动态编译文件；
   2. css 会加载编译好的 css，没办法覆盖主题颜色；压缩后的 css
2. libraryName：只加载库的组件 jsx
3. { "libraryName": "antd", style: "css" }

```jsx
import { Button } from 'antd';
ReactDOM.render(<Button>xxxx</Button>); // 编译结果，不能修改antd样式
      ↓ ↓ ↓ ↓ ↓ ↓
var _button = require('antd/lib/button');
require('antd/lib/button/style/css');
ReactDOM.render(<_button>xxxx</_button>);
```

4. { "libraryName": "antd", style: true}

```jsx
import { Button } from 'antd';
ReactDOM.render(<Button>xxxx</Button>); // 动态编译结果
      ↓ ↓ ↓ ↓ ↓ ↓
var _button = require('antd/lib/button');
require('antd/lib/button/style');
ReactDOM.render(<_button>xxxx</_button>);
```



### dva 按需加载

1. 编辑 `.webpackrc`，使 `babel-plugin-import` 插件生效

```jsx
{
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ]
}
```





## webpack配置

1. 打包后路径问题导致页面空白
2. 生产环境去掉 .map文件
3. 设置代理
4. yarn start不要自动打开浏览器

```jsx
"homepage": "." // 打包后路径问题导致页面空白
"proxy": "http://xxx.xxx" // 设置代理
devtool: shouldUseSourceMap ? 'source-map' : false // 生产环境去掉map文件
// 改为 devtool: false,
```





## 全局loading

![loading](images/loading.jpg)

1. /public/index.html

```jsx
<div id="root"></div>
<div class="ajax-loading" id="ajaxLoading">
  <div class="overlay"></div>
  <div class="loading">
    <img src="https://media.number-7.cn/ebike-h5/static/images/common/loading.gif" alt="">
    <span>加载中，请稍后...</span>
  </div>
</div>
```

2. loading.less

```css
.ajax-loading{
  display: none;
  .loading{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding:0 40px;
    height: 80px;
    line-height: 80px;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 6px;
    text-align: center;
    z-index: 9999;
    font-size: 16px;
    color:#fff;
  }
  img{
    width: 32px;
    vertical-align: middle;
  }
  span{
    margin-left:12px;
  }
  .overlay{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9998;
    background: rgb(255, 255, 255);
    opacity: 0.2;
  }
}
```

3. axios拦截器里面统一处理 loading

```jsx
static axios (options) {
  let loading
  if (options.data && options.data.loading) {
    loading = document.getElementById('ajaxLoading')
    loading.style.dispaly = 'block'
  }
  
  axios({
    url,
    method: 'GET'
  }).then(res => { // 获取数据后隐藏 loading
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading');
      loading.style.display = 'none';
    }
  })
}

// api
axios.ajax({
  url: '/api/list',
  data: {
    params: { page: 2 },
    loading: false
  }
})
```

