## webpack

1. webpack前端打包的首选，成熟的工具
   1. 一切皆模块，不需要二次开发；重点在于配置和使用
2. webpack基础配置
   1. vue-cli
   2. create-react-app
   3. 自己要熟练配置 webpack
3. webpack高级配置
   1. 优化打包效率
   2. 优化产出代码
4. babel
   1. polyfill
   2. runtime
5. rollup 功能单一，webpack功能强大
   1. 工具要尽量功能单一，可集成，扩展
   2. https://segmentfault.com/a/1190000019461556





## webpack配置

1. 拆分配置 & merge
   1. 先定义一个公共的配置 common.js
   2. 再分别定义一个 dev & prod 的配置，通过wepback-merge.smart
2. dev-server 启动本地服务
3. 解析 es6，import模块化
4. 解析 sass & less，抽离到 `webpack.common.js`
5. 解析图片文件
6. loader & plugins 配置



### module & chunks & bundle的区别

1. module 各个源码文件，webpack中一切皆模块
2. chunk 多个模块合并成的，例如：entry, import, splitChunk
3. bundle chunk最终输出的文件
4. 回答概念，结合例子输出好理解，分析问题一样的回答





## babel

1. polyfill
2. runtime



### babel配置

1. `.babelrc` 配置
2. `presets` & `plugins`

```bash
npm i @babel/cli @babel/core @babel/preset-env -S
npm i @babel/plugin-transform-runtime -S

npm i @babel/polyfill @babel/runtime -D
```



### babelrc 配置

1. `.babelrc` 创建文件
2. presets 预设，@babel/preset-env 一堆 plugins的集合
3. 插件

```jsx
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": 3,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```



### babel-ployfill

1. 什么是 ployfill
   1. js代码块，为旧浏览器提供它没有原生支持的较新的功能
2. core-js
   1. core-js集成了es的最新特性， 不支持 generator函数
3. regenerator
4. babel-polyfill特点：
   1. corejs + regenerator的集合，7.4版本已经废弃
   2. 只解析语法，不处理模块化
   3. 文件很大，要配置按需引入
5. babel-polyfill缺点
   1. 污染全局环境
   2. 做个独立的web系统，可以用
   3. 做一个第三方的库，会有代码冲突，解决用 `babel-runtime`
   4. 产出第三方 lib库，要用 babel-runtime，babel-runtime 不会污染全局



### proxy 不能被 polyfill

1. class可以用 function模拟
2. Promise可以用 callback模拟
3. proxy功能用 `Object.defineProperty` 无法模拟





## webpack高级配置

1. MPA多入口配置
2. 抽离 & 压缩 css
3. 抽离公共代码
4. 懒加载
5. 处理react & vue



### MPA多入口配置

1. entry & output & plugins 设置多个入口

```jsx
entry: {
  index: path.join(srcPath, 'index.js'),
  about: path.join(srcPath, 'about.js')
},
output: {
	filename: '[name].[contentHash:8].js', // name依赖 entry的key生成
  path: distPath
},
plugins: [
  new HtmlWebpackPlugin({
    template: path.join(srcPath, 'index.html'),
    filename: 'index.html',
    chunks: ['index'] // chunks 表示页面要引用那些 chunk
  }),
  new HtmlWebpackPlugin({
    template: path.join(srcPath, 'about.html'),
    filename: 'about.html',
    chunks: ['about'] // 只引用 about.js
  })
]
```



### css抽离压缩合并

1. `webpack.prod.js`
2. `npm i mini-css-extract-plugin -S`

```jsx
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module: {
  rule: [
    {
      test: /\.css$/, // 抽离 css
      loader: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader'
      ]
    },
    {
      test: /\.less$/, // 抽离 less
      loader: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'less-loader',
        'postcss-loader'
      ]
    }
  ]
},

plugins: [
  new MiniCssExtractPlugin({ // 1 抽离 css
    filename: 'css/main.[contentHash:8].css'
  })
],
optimization: [ // 2 压缩 css
  minimizer: [
    new TerserJSPlugin({}), 
    new OptimizeCSSAssetsPlugin({})
  ]
]

```



### 抽离公共代码

1. splitChunks
2. cacheGroups

```jsx
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

plugins: [
  // 多入口 - 生成 index.html
  new HtmlWebpackPlugin({
    template: path.join(srcPath, 'index.html'),
    filename: 'index.html',
    // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
    chunks: ['index', 'vendor', 'common']  // 要考虑代码分割
  }),
  // 多入口 - 生成 other.html
  new HtmlWebpackPlugin({
    template: path.join(srcPath, 'other.html'),
    filename: 'other.html',
    chunks: ['other', 'common']  // 考虑代码分割
  })
],
optimization: [ // 2 压缩 css
  minimizer: [
    new TerserJSPlugin({}), 
    new OptimizeCSSAssetsPlugin({})
  ],
  
  // 分割代码块
  splitChunks: {
    // initial 入口 chunk，对于异步导入的文件不处理
    // async 异步 chunk，只对异步导入的文件处理
    chunks: 'all', // all 全部 chunk
    // 缓存分组
    cacheGroups: {
      // 第三方模块
      vendor: {
        name: 'vendor', // 要缓存的 分隔出来 chunk名称
        priority: 1, // 权限更高，优先抽离，重要！！！
        test: /node_modules/,
        minSize: 300,  // 大小限制
        minChunks: 1  // 最少复用过几次
      },

      // 公共的模块
      common: {
        name: 'common', // chunk 名称
        priority: 0, // 优先级
        minSize: 0,  // 公共模块的大小限制
        minChunks: 2  // 公共模块最少复用过几次
      }
    }
  }
]
```



### import 懒加载

1. `import().then`

```jsx
import('./index.js').then(res => {
  console.log(res.default.message) // 注意 default
})
```

2. bablerc 配置

```jsx
{
    "presets": ["@babel/preset-env"],
    "plugins": []
}
```





## webpack 性能优化

1. 优化构建速度
2. 优化代码





### 优化构建速度

1. 优化 babel-loader `use: ['babel-loader?cacheDirectory']`
2. ignorePlugins 忽略那些
3. noParse
4. happyPack 多进程打包
5. ParalleUglifyPlugin 多进程压缩js
6. 不能用于生产环境的优化
   1. 自动刷新  `watch: true`
   2. 热更新 `HotModuleReplacementPlugin`
   3. DllPlugin
      1. 动态链接库
      2. 事先把第三方库打包好，引入



### 优化 babel-loader

```jsx
{
  test: /\.js$/,
  use: ['babel-loader?cacheDirectory'], // 开启缓存
  include: path.resolve(__dirname, 'src'), // 明确范围
  // 排除范围，include & exclude二选一就行
  // exclude: path.resolve(__dirname, 'node_modules')
}
```



### happyPack 多进程打包

1. js单线程，开启多进程打包 `npm i happypack -S`
2. ParallelUglifyPlugin多进程压缩 js `npm i webpack-parallel-uglify-plugin -S`
3. 项目较大，打包慢，开启多进程能提高打包速度
   1. 小项目打包快，开启多进程会降低速度，因为有进程开销

```jsx
const HappyPack = require('happypack')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

module: {
  rules: [
    {
      test: /\.js$/,
      // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
      use: ['happypack/loader?id=babel'],
      include: srcPath,
      // exclude: /node_modules/
    }
  ]
},
plugins:[
	// happyPack 开启多进程打包
  new HappyPack({
    // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
    id: 'babel',
    // 如何处理 .js 文件，用法和 Loader 配置中一样
    loaders: ['babel-loader?cacheDirectory']
  }),
  
  // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
  new ParallelUglifyPlugin({
    // 还是使用 UglifyJS 压缩，只不过帮助开启了多进程
    uglifyJS: {
      output: {
        beautify: false, // 最紧凑的输出
        comments: false // 删除所有的注释
      },
      compress: {
        // 删除所有的 `console` 语句，可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true
      }
    }
  })
]
```



### watch自动刷新

1. 开启  `watch: true`
2. 自动刷新，整个网页全部刷新，速度慢，状态会丢失

```jsx
module.export = {
   // 开启监听，默认 false；开启之后，webpack-dev-server 会自动刷新浏览器
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    // 默认 300ms，监听到变化后 延迟300ms再去执行动作，防止文件更新太快导致重新编译频率太高
    aggregateTimeout: 300,
    // 判断文件是否发生变化，每隔 1000毫秒去询问系统指定文件有木有变化
    poll: 1000
  }
}
```



### HotModule热更新

1. 自动刷新，整个网页全部刷新，速度慢，状态会丢失
2. 热更新，新代码生效，网页不刷新，状态不丢失
3. 热更新在 dev环境下

```jsx
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')

entry: {
  // index: path.join(srcPath, 'index.js'),
  index: [
    // 热更新
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/dev-server',
    path.join(srcPath, 'index.js')
  ],
  other: path.join(srcPath, 'other.js')
},
plugins: [
  new HotModuleReplacementPlugin()
],
devServer: {
  port: 8080,
  progress: true,  // 显示打包的进度条
  contentBase: distPath,  // 根目录
  open: true,  // 自动打开浏览器
  compress: true,  // 启动 gzip 压缩

  hot: true, // 热更新

  proxy: {  // 设置代理
    // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
    '/api': 'http://localhost:3000',

    // 将本地 /api2/xxx 代理到 localhost:3000/xxx
    '/api2': {
      target: 'http://localhost:3000',
      pathRewrite: {
          '/api2': ''
      }
    }
  }
}

// index.js 判断热更新，开启热更新之后的代码逻辑
if (module.hot) {
  module.hot.accept(['./math'], () => {
    const sumRes = sum(10, 30)
    console.log('sumRes in hot', sumRes)
  })
}
```



### DllPlugin 动态链接库

1. 前端框架同一个版本只构建一次，不用每次都重新构建
   1. 体积大，构建慢，针对 dev环境
   2. webpack内置了 DllPlugin
2. DllPlugin 
   1. webpack.dll.js 打包出 `react.dll.js` dll文件
3. DllReferencePlugin
   1. `index.html` 使用 dll文件 `react.dll.js`
   2. `webpack.dev.js` 配置引用
4. 打包 `dependencies` ` react & react-dom`案例



index.html

```html
<body>
  <div id="root"></div>
  <script src="./react.dll.js"></script>
</body>
```

webpack.dev.js

```jsx
// 第一，引入 DllReferencePlugin
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')

mode: 'development',
module: {
	rules: [
    {
      test: /\.js$/,
      loader: ['babel-loader'],
      include: srcPath,
      exclude: /node_modules/ // 第二，不要再转换 node_modules 的代码
    },
  ]
},
plugins: [
  new webpack.DefinePlugin({
    ENV: JSON.stringify('development')
  }),
  // 第三，告诉 Webpack 使用了哪些动态链接库
  new DllReferencePlugin({
    // 描述 react 动态链接库的文件内容
    manifest: require(path.join(distPath, 'react.manifest.json')),
  }),
],
```

webpack.dll.js 打包出 react.dll.js

```jsx
const path = require('path')
const DllPlugin = require('webpack/lib/DllPlugin')
const { srcPath, distPath } = require('./paths')

module.exports = {
  mode: 'development',
  entry: {
    // 入口文件，把 React 相关模块的放到一个单独的动态链接库
    react: ['react', 'react-dom']
  },
  output: {
    // 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称，
    // 也就是 entry 中配置的 react 和 polyfill
    filename: '[name].dll.js',
    // 输出的文件都放到 dist 目录下
    path: distPath,
    // 存放动态链接库的全局变量名称，例如对应 react 来说就是 _dll_react
    // 之所以在前面加上 _dll_ 是为了防止全局变量冲突
    library: '_dll_[name]'
  },
  plugins: [
    // 接入 DllPlugin
    new DllPlugin({
      // 动态链接库的全局变量名称，需要和 output.library 中保持一致
      // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
      // 例如 react.manifest.json 中就有 "name": "_dll_react"
      name: '_dll_[name]',
      // 描述动态链接库的 manifest.json 文件输出时的文件名称
      path: path.join(distPath, '[name].manifest.json'),
    }),
  ],
}
```



## webpack优化代码

1. 使用 `production`生产环境
   1. 体积更小，速度更快，内存使用更少
   2. 合理分包，不重复加载
   3. 自动开启代码压缩，vue & react自动删除 warning代码
2. 小图片 base64编码
3. bundle 加 hash
4. 使用 cdn
5. 提取公共代码
6. import 懒加载
7. scope hosting 提升作用域
   1. 代码体积更小，代码可读性更好
   2. 创建函数作用域更少
8. 自动 tree-shaking，删除没有引用的代码
   1. 只有 ES Module import， tree-shaking才有效，静态引入
   2. **尽量使用 `import & export` 引入**
   3. commonjs 没有tree-shaking无效，因为是动态引入，执行时引入

```jsx
output: {
  // filename: 'bundle.[contentHash:8].js',  // 打包代码时，加上 hash 戳
  filename: '[name].[contentHash:8].js', // name 即多入口时 entry 的 key
  path: distPath,
    // url 加上前缀，如 cdn域名，要把静态css & js上传到 cdn服务器上
  // publicPath: 'http://cdn.abc.com'
},
module: {
  rules: [
    // 图片 - 考虑 base64 编码的情况
    {
      test: /\.(png|jpg|jpeg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          // 小于 5kb 的图片用 base64 格式产出
          // 否则，依然延用 file-loader 的形式，产出 url 格式
          limit: 5 * 1024,
          // 打包到 img 目录下
          outputPath: '/images/',
          // 设置图片的 cdn 地址，可以统一在外面的 output 中设置，将作用于所有静态资源
          // publicPath: 'http://cdn.abc.com'
        }
      }
    },
  ]
}
```



### ES Module & commonjs却别

1. es6 module静态引入，编译时引入，不能通过 if判断引入
2. commonjs动态引入，执行时引入
3. 只有 es6 module才能静态分析，实现 tree-shaking

```jsx
let api = require('./config/index.js')
if (isDev) {
  // 可以动态引入，执行时引入
  api = require('./config/dev.js')
}

import api from './config/index.js'
if (isDev) {
  // 编译报错，只能静态引入
  import api from './config/dev.js'
}
```



### scope hosting

1. 让多个函数合并为一个函数，代码体积更小，代码可读性更好
2. 创建函数作用域更少

```jsx
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')
      
module.exports = {
  resolve: {
    // 针对 npm中的第三方模块，优先采用 jsnext:main 中指向的 es6模块化文件
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  plugins: [
    // 开启 scope hosting
    new ModuleConcatenationPlugin()
  ]
}
```

















